import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { getCountryById, getCountriesByISO2, getCountryName, getCountryByEnglishName, fetchUserInfo } from 'utils';
import { injectMaxMindScript, getGeoIpCountry, removeMaxMindScript } from 'geoip';
import 'whatwg-fetch';
import { withConfig } from 'Providers/ConfigProvider';
import { withLang } from 'Providers/LangProvider';
import * as locale from 'locale';

const Drupal = locale.Drupal;

const NoteComponent = ({ note }) => {
  return <div>
    <span
      dangerouslySetInnerHTML={{
        __html: note
      }}
    />
  </div>
}

const getFoundationNote = (foundation, lang) => {
  return Drupal.t(
    'Your gift will be credited to: @foundation.',
    { '@foundation': foundation.name[lang] }
  );
}

export const getCountrySpecificNote = (country, foundation, lang, currency, fundId, endowmentFunds, behalf, grantNumberSearchStatus) => {
  let note = "";
  switch (getCountryName(country, 'und').toLowerCase()) {
    case 'japan':
      note = getFoundationNote(foundation, lang);
      break;
    case 'australia':
      let isGiveOnBehalfFlow = behalf && behalf.behalfVisibility && behalf.behalfType === 'club';
      if (isGiveOnBehalfFlow) {
        note = getFoundationNote(foundation, lang)
      } else if (endowmentFunds.indexOf(fundId) != -1 && !grantNumberSearchStatus) {
        note = Drupal.t("Donations to Endowment Funds are not tax deductible in Australia.");
      } else {
        switch (currency.id.toLowerCase()) {
          case 'australian dollar':
            note = Drupal.t("Donations of $2 AUD or more are tax deductible in Australia.");
            break;
          case 'us dollar':
            note = Drupal.t("Donations in US Dollar are not tax deductible in Australia. Please donate in Australian Dollar to qualify for tax deductibility.");
            break;
        }
      }

      break;
    default:
      return null;
  }
  return <NoteComponent note={note} />
}

export const getCurrencySpecificNote = currency => {
  switch (currency.id.toLowerCase()) {
    case 'brazilian real':
      return (
        <span>
          Se quiser contribuir através de boleto bancário, <a href="https://www.rotary.org.br/doacao-fundacao-rotaria">clique aqui</a>.
        </span>
      );

    case 'won':
      return (
        <span>
          {Drupal.t('You will receive a tax receipt within a few days of your donation.')}
        </span>
      );
    default:
      return null;
  }
};

const withLoadUser = lifecycle({
  componentDidMount() {
    const {
      config: { api_url, subscriptionEdit, countries, currencies, dmiMode, dmi, dpmMode, dpm },
      setUser,
      setPreferredLang,
      setCreatedBy,
      setCountry,
      setCountryOverridable,
      setRequestSource,
      country: { iso2: countryISO2 },
      currency: { id: currencyId },
      fund: { fundId },
      setFoundation,
      setDonorType,
    } = this.props;
    // Only pre-fill data when a user is creating a new donation.
    if (!subscriptionEdit) {
      // Attempt to determine is user is a logged in Rotary member
      if (!(dmiMode || dpmMode)) {
        // Attempt to determine is user is a logged in Rotary member
        fetchUserInfo(api_url)
          .then(user => {
            let shouldFindCountryByIp = true;
            // Set the default country based on the users primary address, if it's
            // a valid country, and the user hasn't already picked another country
            if (user.address) {
              const country = getCountryByEnglishName(countries, user.address.country);
              if (country) {
                // Set the country to the users address if not otherwise set.
                setCountry(country);
                shouldFindCountryByIp = false;
              }
            }

            setUser(user);
            return shouldFindCountryByIp;
          })
          // Intentionally do nothing on request failure.
          .catch(err => console.log(err))
          .then(shouldFindCountryByIp => {
            if (shouldFindCountryByIp) {
              // Attempt to determine users country via IP address
              injectMaxMindScript()
                .then(getGeoIpCountry)
                .then(data => {
                  if (data.country && data.country.iso_code) {
                    const countriesByISO2 = getCountriesByISO2(countries, data.country.iso_code);
                    const country = countriesByISO2.length ? countriesByISO2[0] : null;
                    if (country) {
                      setCountry(country);
                    }
                  }
                })
                // Intentionally do nothing on request failure.
                .catch(() => { });
            }
          });

        //set requestSource web
        setRequestSource('web');
      } else {
        //dmiMode / dpmMode
        const modeConfig = dmiMode ? dmi : dpm;
        if (dpmMode) {
          if (modeConfig.btnMode == 'addDonation') {
            const dpmDonorType = (modeConfig.user.individual && modeConfig.user.individual.type) ?
              modeConfig.user.individual.type : modeConfig.user.organization.type;
            const donorTypesMap = {
              "Business": "2",
              "Rotary Club": "3",
              "Rotaract Club": "4",
              "Interact Club": "5",
              "Rotary Community Corp": "6",
              "District": "7",
              "Zone": "8",
              "RI": "9",
              "Educational": "10",
              "GB&I": "11",
              "Charitable Organization": "14",
              "Club/District Foundation": "15",
              "Multi-District": "16",
              "Associate Foundation": "17",
              "Alumni Association": "18",
              "Official Licensee": "20",
            };
            let donorType = donorTypesMap[dpmDonorType] != undefined ?
              donorTypesMap[dpmDonorType] : '1';
            setDonorType(donorType);
          }
        }

        if (modeConfig.user.address && modeConfig.user.address.country) {
          const adrs = modeConfig.user.address;
          const country = getCountryByEnglishName(countries, adrs.country);
          if (country) {
            setCountry(country);
          }
        } else {
          if (modeConfig.btnMode == 'addDonation') {
            injectMaxMindScript()
              .then(getGeoIpCountry)
              .then(data => {
                if (data.country && data.country.iso_code) {
                  const countriesByISO2 = getCountriesByISO2(countries, data.country.iso_code);
                  // TODO: Better way to get single country from duplicate ISO2
                  const country = countriesByISO2.length ? countriesByISO2[0] : null;
                  if (country) {
                    setCountry(country);
                  }
                }
              })
              // Intentionally do nothing on request failure.
              .catch(() => { });
          }
        }

        setUser(modeConfig.user);
        setPreferredLang(modeConfig.user.preferred_language);
        setCreatedBy(modeConfig.user.created_by);
      }
    }
  },
  componentWillUnmount() {
    removeMaxMindScript();
  },
});

export default compose(withConfig, withLang, withLoadUser);
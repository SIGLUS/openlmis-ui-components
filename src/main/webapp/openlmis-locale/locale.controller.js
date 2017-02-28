/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2017 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU Affero General Public License for more details. You should have received a copy of
 * the GNU Affero General Public License along with this program. If not, see
 * http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org. 
 */


(function(){
    "use strict";

    angular.module('openlmis-locale')
        .controller('LocaleController', LocaleController);

    LocaleController.$inject = ['$scope', 'messageService', 'alertService', 'notificationService', 'OPENLMIS_LANGUAGES', '$window']
    function LocaleController($scope, messageService, alertService, notificationService, OPENLMIS_LANGUAGES, $window) {
        var locale = this;

        locale.$onInit = onInit;
        locale.changeLocale = changeLocale;
        locale.getLocaleName = getLocaleName;

        function onInit() {
            locale.locales = Object.keys(OPENLMIS_LANGUAGES).sort();

            locale.selectedLocale = messageService.getCurrentLocale();

            if(!locale.selectedLocale){
                messageService.populate().then(function() {
                    locale.selectedLocale = messageService.getCurrentLocale();

                });
            }
        }

        function changeLocale(localeKey) {
            if(localeKey) {
                messageService.populate(localeKey).then(function() {
                    locale.selectedLocale = messageService.getCurrentLocale();
                    $window.location.reload();
                }, function() {
                    alertService.error('locale.load.error');
                });
            }
        }

        function getLocaleName(key){
            if(OPENLMIS_LANGUAGES[key]){
                return OPENLMIS_LANGUAGES[key];
            }

            return key;
        }
    }

})();

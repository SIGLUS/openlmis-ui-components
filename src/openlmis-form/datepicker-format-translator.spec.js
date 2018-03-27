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

describe('DatepickerFormatTranslator', function() {

    var datepickerFormatTranslator, DatepickerFormatTranslator;

    beforeEach(function() {
        module('openlmis-form');

        inject(function($injector) {
            DatepickerFormatTranslator = $injector.get('DatepickerFormatTranslator');
        });

        datepickerFormatTranslator = new DatepickerFormatTranslator();
    });

    describe('translate', function() {
    
        it('should replace m with M', function() {
            expect(datepickerFormatTranslator.translate('dd/m/yyyy'))
                .toEqual('dd/M/yyyy');
        });

        it('should replace mm with MM', function() {
            expect(datepickerFormatTranslator.translate('dd/mm/yyyy'))
                .toEqual('dd/MM/yyyy');
        });

        it('should replace M with MMM', function() {
            expect(datepickerFormatTranslator.translate('dd/M/yyyy'))
                .toEqual('dd/MMM/yyyy');
        });

        it('should replace MM with MMMM', function() {
            expect(datepickerFormatTranslator.translate('dd/MM/yyyy'))
                .toEqual('dd/MMMM/yyyy');
        });

        it('should ignore non-M properties', function() {
            expect(datepickerFormatTranslator.translate('dd/yyyy'))
                .toEqual('dd/yyyy');
        });
    
    });

});
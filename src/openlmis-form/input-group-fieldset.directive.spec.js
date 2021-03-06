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

describe('Input Group', function() {

    beforeEach(function() {
        module('openlmis-form');

        inject(function($injector) {
            this.$compile = $injector.get('$compile');
            this.$rootScope = $injector.get('$rootScope');
        });

        this.scope = this.$rootScope.$new();
    });

    it('adds input-control directive to fieldsets with inputs that have same name attribute', function() {
        var markup = '<fieldset><input type="radio" name="example" /><input type="radio" name="example" /></fieldset>',
            fieldset = this.$compile(markup)(this.scope);

        expect(fieldset.attr('input-control')).toBe('');
        expect(fieldset.attr('openlmis-invalid')).toBe('');

        // Counter example, which will not add input-control or openlmis-invalid;
        markup = '<fieldset><input type="radio" name="willNot" /><input type="radio" name="work" /></fieldset>';
        fieldset = this.$compile(markup)(this.scope);

        expect(fieldset.attr('input-control')).toBeUndefined();
        expect(fieldset.attr('openlmis-invalid')).toBeUndefined();
    });

    it('only adds input-control directive if input type is radio OR checkbox', function() {
        var markup = '<fieldset><input type="radio" name="example" /></fieldset>',
            fieldset = this.$compile(markup)(this.scope);

        expect(fieldset.attr('input-control')).toBe('');
        expect(fieldset.attr('openlmis-invalid')).toBe('');

        markup = '<fieldset><input type="checkbox" name="example" /></fieldset>';
        fieldset = this.$compile(markup)(this.scope);

        expect(fieldset.attr('input-control')).toBe('');
        expect(fieldset.attr('openlmis-invalid')).toBe('');

        markup = '<fieldset><input type="text" /></fieldset>';
        fieldset = this.$compile(markup)(this.scope);

        expect(fieldset.attr('input-control')).toBeUndefined();
        expect(fieldset.attr('openlmis-invalid')).toBeUndefined();
    });
});
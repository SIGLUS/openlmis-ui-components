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

(function() {

    'use strict';

    /**
     * @ngdoc directive
     * @restrict E
     * @name openlmis-form.directive:input-control-wrap
     *
     * @description
     * Wraps inputs with an input-control element, unless one already exists.
     */

    angular
        .module('openlmis-form')
        .directive('input', directive)
        .directive('select', directive)
        .directive('textarea', directive);

    directive.$inject = ['$compile', '$templateCache'];
    function directive($compile, $templateCache) {
        return {
            compile: function(element, attrs){
                return {
                    pre: compile,
                    post: link
                }
            },
            priority: 20,
            restrict: 'E',
            require: [
                '?^inputControl',
                '?ngModel'
            ]
        };

        /**
         * @ngdoc method
         * @methodOf openlmis-form.directive:input-control-wrap
         * @name link
         *
         * @description
         * Once the input is rendered, it registers the input's ngModel with
         * the input-control controller. Then hides any error messages that
         * would be shown with openlmis-invalid.
         */
        function link(scope, element, attrs, ctrls) {
            var inputCtrl = ctrls[0],
                ngModelCtrl = ctrls[1];

            if(!inputCtrl) {
                return;
            }

            if(inputCtrl && ngModelCtrl){
                inputCtrl.addNgModel(ngModelCtrl);
            }
        }

        /**
         * @ngdoc method
         * @methodOf openlmis-form.directive:input-control-wrap
         * @name compile
         *
         * @description
         * If the element isn't a button or submit input, then the element is
         * wrapped and recompiled with a input-control element around it.
         *
         * This doesn't happen if there is already an input-control element
         * set as the input's parent.
         *
         * Radio and checkbox elements are treated differently.
         */
        function compile(scope, element, attrs) {
            // make sure input element is wrapped in an input control element
            if(element.parents('[input-control]:first').length == 0) {
                switch(element.attr('type')){
                    case 'file':
                    case 'button':
                    case 'submit':
                        break;
                    case 'radio':
                    case 'checkbox':
                        var fieldset = element.parents('fieldset:first');
                        if(fieldset.length > 0 && isSingleTypeFieldset(fieldset)){
                            setupFieldset(scope, fieldset);
                        }
                        break;
                    default:
                        wrapElement(scope, element);
                }
            }
        }

        /**
         * @ngdoc method
         * @methodOf openlmis-form.directive:input-control-wrap
         * @name wrap
         *
         * @description
         * The input-control-wrap.html is loaded, and then compiled separetly.
         *
         * jQuery's element.wrap wan't used because it copies the HTML for the
         * input-control wrapper — meaning the angular elements are not
         * activated.
         */
        function wrapElement(scope, element){
            var html = $templateCache.get('openlmis-form/input-control-wrap.html'),
                inputWrap = $compile(html)(scope);

            element.before(inputWrap);
            inputWrap.append(element);
        }

        function isSingleTypeFieldset(fieldset) {
            var type = false,
                matches = true;

            fieldset.find('[name],[ng-model]').each(function(index, element){
                var elementType = element['name'];
                if(element['ng-model']){
                    elementType = element['ng-model'];
                }

                if(!elementType) {
                    return;
                }

                if(!type) {
                    type = elementType;
                } else if(!matches || type != elementType) {
                    matches = false;
                }
            });

            return matches;
        }

        function setupFieldset(scope, fieldset) {
            fieldset.attr('input-control', "");
            fieldset.attr('openlmis-invalid', "");

            var newFieldset = $compile(fieldset.clone())(scope);
            fieldset.replaceWith(newFieldset);
        }
    }

})();

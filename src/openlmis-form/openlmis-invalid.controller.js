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
     * @ngdoc controller
     * @name openlmis-form.controller:openlmisInvalidController
     *
     * @description
     * Contains and renders list of error messages.
     */
    
    angular
        .module('openlmis-form')
        .controller('OpenlmisInvalidController', controller);

    controller.$inject = ['messageService']
    function controller(messageService) {
        var vm = this,
            messages = {};

        vm.getMessages = getMessages;
        vm.setMessages = setMessages;
        vm.resetMessages = resetMessages;

        /**
         * @ngdoc method
         * @methodOf openlmis-form.controller:openlmisInvalidController
         * @name  getMessages
         *
         * @description Gets an object of messages
         *
         * @returns {Object} Object of message keys and names
         */
        function getMessages() {
            return messages;
        }

        /**
         * @ngdoc method
         * @methodOf openlmis-form.controller:openlmisInvalidController
         * @name setMessages
         *
         * @description
         * Sets the messages for the internal object, parsing any message
         * values that are a boolean with parseMessage
         */
        function setMessages(newMessages){
            Object.keys(newMessages).forEach(function(key) {
                if(typeof(newMessages[key]) == 'boolean') {
                    newMessages[key] = parseMessage(key);
                }
            });

            messages = newMessages;
        }

        function resetMessages() {
            messages = {};
        }

        /**
         * @ngdoc method
         * @methodOf openlmis-form.controller:openlmisInvalidController
         * @name parseMessages
         *
         * @description
         * Takes a message key, and will use the messageService to return a 
         * readable value.
         *
         * This method will first try to get specific openlmisForm. prefixed
         * version of the message.
         */
        function parseMessage(message) {
            var openlmisFormMessageKey = 'openlmisForm.' + message,
                openlmisFormMessage = messageService.get(openlmisFormMessageKey);
            if(openlmisFormMessage != openlmisFormMessageKey) {
                return openlmisFormMessage;
            } else {
                return messageService.get(message);
            }
        }

    }
        
})();
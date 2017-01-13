/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2013 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program.  If not, see http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org.
 */

(function(){
    'use strict';
    /**
     *
     * @ngdoc service
     * @name openlmis-program.programService
     *
     * @description
     * Resposible for retriving programs from server.
     */
    angular
        .module('openlmis-program')
        .factory('programService', service);

    service.$inject = ['openlmisUrlFactory', '$resource', '$q', 'offlineService', 'localStorageFactory'];

    function service(openlmisUrlFactory, $resource, $q, offlineService, localStorageFactory){

        var resource = $resource(openlmisUrlFactory('/api/programs/:id'), {}, {
                'getAll': {
                    url: openlmisUrlFactory('/api/programs'),
                    method: 'GET',
                    isArray: true
                },
                'getUserPrograms': {
                    url: openlmisUrlFactory('api/users/:userId/programs'),
                    method: 'GET',
                    isArray: true
                }
            }),
            userProgramsOffline = localStorageFactory('userPrograms');

        return {
            get: get,
            getAll: getAll,
            getUserPrograms: getUserPrograms
        };

        /**
         * @ngdoc function
         * @name  get
         * @methodOf openlmis-program.programService
         *
         * @description
         * Gets program by id.
         *
         * @param {String} id Program UUID
         * @returns {Promise} Program info
         */
        function get(id) {
            return resource.get({id: id}).$promise;
        }

        /**
         * @ngdoc function
         * @name  get
         * @methodOf openlmis-program.programService
         *
         * @description
         * Gets all programs and adds requisition template to it.
         *
         * @returns {Promise} Array of all programs with templates
         */
        function getAll() {
            return resource.getAll().$promise;
        }

        /**
         * @name getUserPrograms
         * @methodOf openlmis-program.programService
         *
         * @description
         * Retrieves programs for the current user and saves it in local storage.
         * If the user is offline program are retreived from the local storage.
         *
         * @param {String} userId User UUID
         * @param {Boolean} isForHomeFacility Indicates if programs should be for home or supervised facilities
         * @return {Promise} array of programs
         */
        function getUserPrograms(userId, isForHomeFacility) {
            var deferred = $q.defer();
            if(offlineService.isOffline()) {
                var programs = userProgramsOffline.search({
                    userIdOffline: userId,
                    isForHomeFacilityOffline: isForHomeFacility
                });
                deferred.resolve(programs);
            } else {
                resource.getUserPrograms({userId: userId, forHomeFacility: isForHomeFacility}, function(response) {
                    angular.forEach(response, function(program) {
                        var storageProgram = angular.copy(program);
                        storageProgram.userIdOffline = userId;
                        storageProgram.isForHomeFacilityOffline = isForHomeFacility;
                        userProgramsOffline.put(storageProgram);
                    });
                    deferred.resolve(response);
                }, function() {
                    deferred.reject();
                });
            }
            return deferred.promise;
        };
    }
})();

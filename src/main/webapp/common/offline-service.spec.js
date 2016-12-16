describe("OfflineService", function() {

    var offline, offlineService, timeout;

    beforeEach(module('openlmis-core'));

    beforeEach(inject(function(OfflineService, Offline, $timeout) {
        offlineService = OfflineService;
        offline = Offline;
        timeout = $timeout;
    }));

    it('should return false when there is internet connection', function() {
        spyOn(offline, 'check').andCallFake(function() {
            offline.trigger('confirmed-up');
        });

        offlineService.checkConnection();
        timeout.flush(30001);

        expect(offlineService.offline).toBe(false);
    });

    it('should return true when there is no internet connection', function() {
        spyOn(offline, 'check').andCallFake(function() {
            offline.trigger('confirmed-down');
        });

        offlineService.checkConnection();
        timeout.flush(30001);

        expect(offlineService.offline).toBe(true);
    });

    it('should return false when the connection has gone from down to up', function() {
        spyOn(offline, 'check').andCallFake(function() {
            offline.trigger('up');
        });

        offlineService.checkConnection();
        timeout.flush(30001);

        expect(offlineService.offline).toBe(false);
    });

    it('should return true when the connection has gone from up to down', function() {
        spyOn(offline, 'check').andCallFake(function() {
            offline.trigger('down');
        });

        offlineService.checkConnection();
        timeout.flush(30001);

        expect(offlineService.offline).toBe(true);
    });
});
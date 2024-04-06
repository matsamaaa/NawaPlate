const { MAINTENANCE } = require('../../Configs/Datas');

module.exports = class InteractionChecker {

    static globalMaintenance() {
        return MAINTENANCE;
    }

}
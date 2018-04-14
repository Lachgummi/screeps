/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var upgrader = (function() {
    
    function run(creep) {
        var action = creep.memory.action;
        if (action == 'harvesting' && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        } else if (action == 'upgrading' && creep.carry.energy > 0){
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            decideNextAction(creep);
        }
    }
    
    function decideNextAction(creep) {
        var action;
        
        if (creep.carry.energy == 0) {
            action = 'harvesting';
        } else {
            action = 'upgrading';
        }
        
        creep.memory.action = action;
    }
    
    function isEnergyFull(creep) {
        return creep.carry.energy == creep.carryCapacity;
    }
    
    function isEnergyEmpty(creep) {
        return creep.carry.energy == 0;
    }
    
    return {
        run: run
    }
})();

module.exports = upgrader;

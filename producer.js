/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('producer');
 * mod.thing == 'a thing'; // true
 */
 
var producer = (function() {
    
    function produceCreep (spawn) {
        
        if (!spawn.spawning) {
            
            var harvesterMax = 12;
            
            if (countCreeps('harvester') < harvesterMax) {
                console.log('producing harvester');
                Game.spawns['Spawn1'].createCreep([MOVE, CARRY, WORK, WORK], {role: 'harvester'});
            } else if (countCreeps('upgrader') < 3) {
                console.log('producing upgrader');
                Game.spawns['Spawn1'].createCreep([MOVE, CARRY, WORK, CARRY, CARRY], {role: 'upgrader'});
            }
            
            /**
             * 
            var sourceInfos = spawn.room.memory.sources;
            for (var sourceInfo in sourceInfos) {
                var sourceCreeps = _.filter(Game.creeps, creep => creep.memory.sourceId == sourceInfo.id);

                //if (sourceInfo.harvesterMax && sourceInfo.harvesterMax )
            }
            **/
                    
        }
        
        
        
        //console.log('producing creeps');
    }
    
    function countCreeps(role) {
        var creeps = _.filter(Game.creeps, creep => creep.memory.role == role);
        //console.log('found these creeps for role ' + role + ': ' + creeps);
        //console.log('size: ' + creeps.length);
        return creeps.length;
    }
    
    function clearDeadMemory() {
        for(var creep in Memory.creeps) {
            if(!Game.creeps[creep]) {
                delete Memory.creeps[creep];
            }
        }
    }
    
    function respawnDeadCreeps() {
        
    }
    
    return {
        produceCreep: produceCreep,
        clearDeadMemory: clearDeadMemory
    };
})();


module.exports = producer;

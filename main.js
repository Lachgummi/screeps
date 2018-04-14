var roleHarvester = require('role.harvester');
var producer = require('producer');
var upgrader = require('role.upgrader');


module.exports.loop = function () {
    console.log("main loop is running");
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        
        if (creep.memory.role == 'upgrader') {
            upgrader.run(creep);
        }
    }
    
    for (var spawn in Game.spawns) {
        producer.produceCreep(spawn);
    }
    producer.clearDeadMemory();
}



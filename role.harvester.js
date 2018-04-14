/**
 * A harvester is assigned to a single source and keeps harvesting it.
 **/
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var action = creep.memory.action;
        console.log("action for " + creep.name + "is " + action);
        
	    if (action == 'harvesting' && creep.carry.energy < creep.carryCapacity) {
	        console.log(creep.name + ' is harvesting');
	    
	        var source = findSourceForCreep(creep);
    	    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }    
	        
	    } else if (action == 'storing' && creep.carry.energy > 0 && Game.spawns['Spawn1'].energy < 
Game.spawns['Spawn1'].energyCapacity) {
	        console.log(creep.name + ' is storing');
            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
	    } else if(action == 'upgrading' && creep.carry.energy > 0) {
	        console.log(creep.name + 'is upgrading');
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            console.log(creep.name + ' is deciding on new action');
            decideNextAction(creep);
        }
	}
};

function decideNextAction(creep) {
    var spawn1 = Game.spawns['Spawn1'];
    var action;
    
    if (creep.carry.energy == 0) {
        action = 'harvesting';
    } else if (spawn1.energy < spawn1.energyCapacity) {
        action = 'storing';
    } else {
        action = 'upgrading';
    }
    
    creep.memory.action = action;
    console.log('decided next action [' + action + '] for creep: ' + creep.name);
}

function findCreepsForSource(source) {
    return _.filter(Game.creeps, creep => creep.memory.sourceId == source.id);
}

function findSourceForCreep(creep) {
    console.log("finding source for creep");
    var source = Game.getObjectById(creep.memory.sourceId);
	        
    if (!source) {
        console.log("no source assigned to creep. finding good source");
        var sources = creep.room.find(FIND_SOURCES);
        console.log("found these sources in room: "+ sources);

        if (!Memory.sources) {
            Memory.sources = {};
        }
        for (var i = 0; i < sources.length; i++) {
            var s = sources[i];
            
            console.log("checking source " + s);
            if (!Memory.sources[s.id]) {
                Memory.sources[s.id] = {};
            }
         
            var harvesterCount = Memory.sources[s.id].harvesterCount;
            
            if (!harvesterCount) {
                console.log("harvestercount for source is empty, defaulting to 5");
                harvesterCount = 5;
                Memory.sources[s.id].harvesterCount = harvesterCount;
            }
            if (findCreepsForSource(s).length < harvesterCount) {
                console.log("found good source: " + s.id);
                creep.memory.sourceId = s.id;
                var source = s;
                break;
            }                
            
        }
        
    } else {
        console.log("creep has a source assigned.");
    }
    
    return source;
}

module.exports = roleHarvester;

(function(global){
    
    // Find start and end positions of each loop.
    function findLoops(code) {
        var start;
        var startpoints = {};
        var endpoints = {};
        var stack = [];
    
        for (var i = 0; i < code.length; i++) {
            if (code[i] == '[') {
                stack.push(i);
            } else if (code[i] == ']') {
                start = stack.pop();
                startpoints[i] = start;
                endpoints[start] = i;
            }
        }
        
        return { start: startpoints, end: endpoints };
    }
    
    // Run the brainfuck interpreter.
    function run(source,chan) {
        var brainfuck = this;
        var code = source.replace(/[^-+<>.,[\]]/g, '').split('');  // program code
        var loop = findLoops(code);  // loop start and end positions
        var data = [];  // array of data cells stored by the program code
        var cell = 0;   // index in the data array representing one "cell" of data
        var next = 0;   // index in the code array of the next instruction to run 
        var operation = {
            '>': function () { ++cell; },
            '<': function () { --cell; },
            '+': function () { data[cell] = (data[cell] || 0) + 1; },
            '-': function () { data[cell] = (data[cell] || 0) - 1; },
            '.': function () { brainfuck.write(data[cell],chan); },
            ',': function () { data[cell] = brainfuck.read(); },
            '[': function () { if (!data[cell]) { next = loop.end[next]; } },
            ']': function () { if (data[cell]) { next = loop.start[next]; } }
        };
    
        while (next < code.length) {
            operation[code[next]]();
            next++;
        }
    
        if (brainfuck.end) {
            brainfuck.end(chan);
        }
    }
    
    // Export a module for AMD loaders, CJS environments, or as a global.
    function exportModule(name, module) {
        if (global['define'] && global['define']['amd']) {
            global['define'](module);
        } else if (global['exports']) {
            for (var key in module) if (module.hasOwnProperty(key)) {
                global['exports'][key] = module[key];
            }
        } else {
            global[name] = module;
        }
    }
    
    // Export brainfuck module. 
    exportModule('brainfuck', { 
        'run': run,
        'read': function() { throw new Error('"read" function not provided'); },
        'write': function() { throw new Error('"write" function not provided'); }
    });
    
}(this));


// implementation

(function () {

    var inputBuffer = [];
    var outputBuffer = [];

    function flush(chan) {
        sendMessage(outputBuffer.splice(0).join(''),chan);
    }
    
    brainfuck.read = function () {
        if (!inputBuffer.length) {
            inputBuffer = prompt().split('');
            inputBuffer.push(String.fromCharCode(0));
        }
        return inputBuffer.shift().charCodeAt(0) || -1;
    };

    brainfuck.write = function (character,chan) {
        if (character == 10) {
            //flush(chan);
        } else {
            outputBuffer.push(String.fromCharCode(character));
        }
    };

    brainfuck.end = function(chan) {
        flush(chan);
        inputBuffer = [];
    };

}());

function brainfucker(txt,chan)
{
	txt = txt.replace(commandTag+"bfck ","");
    brainfuck.run(txt,chan);
}
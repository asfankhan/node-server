var log = {
    info: function (info) { 
        console.log('Info: ' + info);
    },
    warning:function (warning) { 
        console.log('Warning: ' + warning);
    },
    error:function (error) { 
        console.log('Error: ' + error);
    }
};
class roomData{

}

module.exports.print = () => {
    console.log("print funtion")
}

// module.exports = {
//     log : log
//   }
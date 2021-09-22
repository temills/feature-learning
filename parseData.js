// This file holds functions for parsing the data 

import { json } from "body-parser"
/*
//reformat data before saving
function reformatData(data) {
    var numPairs = 16;
    var startIndex = 4;
    //list of dictionaries, where each dictionary keeps the data for a single trial
    //Those dictionaries will become  rows in the data table
    var allData = [];
    var trialIndex = startIndex;
    var botNames = {};
    for (var i=0; i<numPairs; i=i+1) {
        var tData = {};
        tData.turk_code = JSON.parse(JSON.stringify(data[0]))["turk_code"];
        tData.subject_id = JSON.parse(JSON.parse(JSON.stringify(data[2]))["responses"])["subject_id"];
        tData.usefulFt1 = JSON.parse(JSON.stringify(data[0]))["usefulFt1"];
        tData.usefulFt2 = JSON.parse(JSON.stringify(data[0]))["usefulFt2"];
        tData.favoredEnd1 = JSON.parse(JSON.stringify(data[0]))["favoredEnd1"];
        tData.favoredEnd2 = JSON.parse(JSON.stringify(data[0]))["favoredEnd2"];
        tData.trial_order = i+1;
        //trial specific data
        trial = JSON.parse(JSON.stringify(data[trialIndex]));
        tData.rt = trial['rt'];
        tData.bot1 = trial['namedWug'];
        tData.bot2 = trial['otherWug'];
        tData.name1 = trial['name'];
        tData.name2 = trial['otherName'];
        tData.correct = trial['correct'];
        //if wrong, get learning data
        if(!(tData.correct)){
            trialIndex=trialIndex+2;
            trial = JSON.parse(JSON.stringify(data[trialIndex]));
            //get bot order
            if (trial["first"]=="named"){
                tData.firstBot = trial['namedWug'];
                tData.firstBotName = trial['name'];
                tData.secondBot = trial['otherWug'];
                tData.secondBotName = trial['otherName'];
                botNames[trial['name']] = trial['namedWug'];
                botNames[trial['otherName']] = trial['otherWug'];
            }
            else {
                tData.firstBot = trial['otherWug'];
                tData.firstBotName = trial['otherName'];
                tData.secondBot = trial['namedWug'];
                tData.secondBotName = trial['name'];
            }
            //get num attempts and rt til correct
            var attempts1=0;
            var rts1 = [];
            while (trial["trial_type"] == 'canvas-button-response') {
                rts1.push(trial["rt"]);
                attempts1=attempts1+1;
                trialIndex=trialIndex+1;
                trial=JSON.parse(JSON.stringify(data[trialIndex]));
            }
            tData.firstAttempts = [attempts1];
            tData.firstRt = rt1;
            //now get num attempts and rt for second bot
            trialIndex=trialIndex+1;
            trial=JSON.parse(JSON.stringify(data[trialIndex]));
            var attempts2=0;
            var rts2 = [];
            while (trial["trial_type"] == "canvas-button-response") {
                rts2.push(trial["rt"]);
                attempts2=attempts2+1;
                trialIndex=trialIndex+1;
                trial=JSON.parse(JSON.stringify(data[trialIndex]));
            }
            tData.secondAttempts = [attempts2];
            tData.secondRt = rt2;
            trialIndex = trialIndex - 1;
        }
        trialIndex = trialIndex + 2; //skip feedback trial
        allData.push(tData);
    }
*/





    //reformat data before saving
    function reformatData(data) {
        var numWugs = 8;
        var numPairs = numWugs*2;
        var startIndex = 4;
        //list of dictionaries, where each dictionary keeps the data for a single trial
        //Those dictionaries will become  rows in the data table
        //general data
        //var tempData = {}
        //var allData = [];
        var trialIndex = startIndex;
        var botNames = {};
        var tData = {};
        tData.turk_code = JSON.parse(JSON.stringify(data[0]))["turk_code"];
        tData.subject_id = JSON.parse(JSON.stringify(data[2]))["response"]["subject_id"];
        tData.usefulFt1 = JSON.parse(JSON.stringify(data[0]))["usefulFt1"];
        tData.usefulFt2 = JSON.parse(JSON.stringify(data[0]))["usefulFt2"];
        tData.favoredEnd1 = JSON.parse(JSON.stringify(data[0]))["favoredEnd1"];
        tData.favoredEnd2 = JSON.parse(JSON.stringify(data[0]))["favoredEnd2"];
        
        //tempData.subject_id = tData.subject_id;

        //first trial
        tData.round1rt = [];
        tData.round1bot1 = [];
        tData.round1bot2 = [];
        tData.round1name1 = [];
        tData.round1name2 = [];
        tData.round1correct = [];
        tData.wrong1firstBot = []; //if wrong in round 1, first bot displayed in learn trial
        tData.wrong1firstBotName = [];
        tData.wrong1secondBot = [];
        tData.wrong1secondBotName = [];
        tData.wrong1firstAttempts = [];
        tData.wrong1firstRt = [];
        tData.wrong1secondAttempts = [];
        tData.wrong1secondRt = [];
        for (var i=0; i<numPairs*2; i=i+1) {
            //tData.trial_order = i+1;
            //trial specific data
            var trial = JSON.parse(JSON.stringify(data[trialIndex]));
            tData.round1rt.push(trial['rt']);
            tData.round1bot1.push(trial['namedWug']);
            tData.round1bot2.push(trial['otherWug']);
            tData.round1name1.push(trial['name']);
            tData.round1name2.push(trial['otherName']);
            tData.round1correct.push(trial['correct']);
            //if wrong, get learning data
            if(!(trial['correct'])){
                trialIndex=trialIndex+2;
                console.log("incorrect, trialIndex:")
                console.log(trialIndex)
                trial = JSON.parse(JSON.stringify(data[trialIndex]));
                //get bot order
                if (trial["first"]=="named"){
                    tData.wrong1firstBot.push(trial['namedWug']);
                    tData.wrong1firstBotName.push(trial['name']);
                    tData.wrong1secondBot.push(trial['otherWug']);
                    tData.wrong1secondBotName.push(trial['otherName']);
                    botNames[trial['name']] = trial['namedWug'];
                    botNames[trial['otherName']] = trial['otherWug'];
                }
                else {
                    tData.wrong1firstBot.push(trial['otherWug']);
                    tData.wrong1firstBotName.push(trial['otherName']);
                    tData.wrong1secondBot.push(trial['namedWug']);
                    tData.wrong1secondBotName.push(trial['name']);
                    botNames[trial['name']] = trial['namedWug'];
                    botNames[trial['otherName']] = trial['otherWug'];
                }
                //get num attempts and rt til correct
                var attempts1=0;
                var rts1 = [];
                var correct = false;
                while (!correct) {
                    rts1.push(trial["rt"]);
                    attempts1=attempts1+1;
                    if (trial["answer"] == trial["response"]) {
                        correct = true;
                    }
                    trialIndex=trialIndex+2;
                    trial=JSON.parse(JSON.stringify(data[trialIndex]));
                }
                tData.wrong1firstAttempts.push(attempts1);
                tData.wrong1firstRt.push(rts1);
                //now get num attempts and rt for second bot
                var attempts2=0;
                var rts2 = [];
                correct = false;
                while (!correct) {
                    rts2.push(trial["rt"]);
                    attempts2=attempts2+1;
                    if (trial["answer"] == trial["response"]) {
                        correct = true;
                    }
                    trialIndex=trialIndex+2;
                    trial=JSON.parse(JSON.stringify(data[trialIndex]));
                }
                tData.wrong1secondAttempts.push(attempts2);
                tData.wrong1secondRt.push(rts2);
            }
            else {
                tData.wrong1firstBot.push(" ");
                tData.wrong1firstBotName.push(" ");
                tData.wrong1secondBot.push(" ");
                tData.wrong1secondBotName.push(" ");
                tData.wrong1firstAttempts.push(0);
                tData.wrong1firstRt.push([]);
                tData.wrong1secondAttempts.push(0);
                tData.wrong1secondRt.push([]);
                trialIndex = trialIndex+2;
            }
        }
        console.log("after first trial:")
        console.log(trialIndex)
        //memory test between trials 114-129
        //var tDict = tData;
        trial=JSON.parse(JSON.stringify(data[trialIndex]));
        var memoryNames = [];
        var memoryBots = [];
        var memoryResponse = [];
        var memoryRts = [];
        var memoryCorrect = [];
        //list of names, list of responses, list of correct, list of bots in same order as names
        for(var i=0; i<numWugs; i++){
            var correctName = trial["name"]
            memoryNames.push(correctName);
            memoryBots.push(botNames[correctName]);
            memoryResponse.push(trial["names"][trial["response"]]);
            memoryRts.push(trial["rt"]);
            memoryCorrect.push((trial["names"][trial["response"]]) == correctName);
            trialIndex=trialIndex+2;//skip feedback
            trial=JSON.parse(JSON.stringify(data[trialIndex]));
        }
        tData.memoryNames = memoryNames;
        tData.memoryBots = memoryBots;
        tData.memoryResponse = memoryResponse;
        tData.memoryRts = memoryRts;
        tData.memoryCorrect = memoryCorrect;
        //tempData.memoryNames1 = memoryNames;
        //tempData.memoryBots1 = memoryBots;
        //tempData.memoryResponses1 = memoryResponse;
        //tempData.memoryCorrect1 = memoryCorrect;
        console.log("after first memory:")
        console.log(trialIndex)
        //second trial
        tData.round2rt = [];
        tData.round2bot1 = [];
        tData.round2bot2 = [];
        tData.round2name1 = [];
        tData.round2name2 = [];
        tData.round2correct = [];
        tData.wrong2firstBot = [];
        tData.wrong2firstBotName = [];
        tData.wrong2secondBot = [];
        tData.wrong2secondBotName = [];
        tData.wrong2firstAttempts = [];
        tData.wrong2firstRt = [];
        tData.wrong2secondAttempts = [];
        tData.wrong2secondRt = [];
        for (var i2=0; i2<numPairs*2; i2=i2+1) {
            //tData.trial_order = i2+i+1;
            //trial specific data
            trial = JSON.parse(JSON.stringify(data[trialIndex]));
            tData.round2rt.push(trial['rt']);
            tData.round2bot1.push(trial['namedWug']);
            tData.round2bot2.push(trial['otherWug']);
            tData.round2name1.push(trial['name']);
            tData.round2name2.push(trial['otherName']);
            tData.round2correct.push(trial['correct']);
            //if wrong, get learning data
            if(!(trial['correct'])){
                trialIndex=trialIndex+2;
                trial = JSON.parse(JSON.stringify(data[trialIndex]));
                //get bot order
                if (trial["first"]=="named"){
                    tData.wrong2firstBot.push(trial['namedWug']);
                    tData.wrong2firstBotName.push(trial['name']);
                    tData.wrong2secondBot.push(trial['otherWug']);
                    tData.wrong2secondBotName.push(trial['otherName']);
                    botNames[trial['name']] = trial['namedWug'];
                    botNames[trial['otherName']] = trial['otherWug'];
                }
                else {
                    tData.wrong2firstBot.push(trial['otherWug']);
                    tData.wrong2firstBotName.push(trial['otherName']);
                    tData.wrong2secondBot.push(trial['namedWug']);
                    tData.wrong2secondBotName.push(trial['name']);
                    botNames[trial['name']] = trial['namedWug'];
                    botNames[trial['otherName']] = trial['otherWug'];
                }
                //get num attempts and rt til correct
                var attempts1=0;
                var rts1 = [];
                var correct = false;
                while (!correct) {
                    rts2.push(trial["rt"]);
                    attempts1=attempts1+1;
                    if (trial["answer"] == trial["response"]) {
                        correct = true;
                    }
                    trialIndex=trialIndex+2;
                    trial=JSON.parse(JSON.stringify(data[trialIndex]));
                }
                tData.wrong2firstAttempts.push(attempts1);
                tData.wrong2firstRt.push(rts1);
                //now get num attempts and rt for second bot
                trialIndex=trialIndex+1;
                trial=JSON.parse(JSON.stringify(data[trialIndex]));
                var attempts2=0;
                var rts2 = [];
                correct=false;
                while (!correct) {
                    rts2.push(trial["rt"]);
                    attempts2=attempts2+1;
                    if (trial["answer"] == trial["response"]) {
                        correct = true;
                    }
                    trialIndex=trialIndex+2;
                    trial=JSON.parse(JSON.stringify(data[trialIndex]));
                }
                tData.wrong2secondAttempts.push(attempts2);
                tData.wrong2secondRt.push(rts2);
            }
            else {
                tData.wrong2firstBot.push(" ");
                tData.wrong2firstBotName.push(" ");
                tData.wrong2secondBot.push(" ");
                tData.wrong2secondBotName.push(" ");
                tData.wrong2firstAttempts.push(0);
                tData.wrong2firstRt.push([]);
                tData.wrong2secondAttempts.push(0);
                tData.wrong2secondRt.push([]);
                trialIndex=trialIndex+2;
            }
        }
        console.log("after second trial:")
        console.log(trialIndex)
        trialIndex=trialIndex+1; //skip instructions
        //add demo info

        var demo1 = JSON.parse(JSON.stringify(data[trialIndex]))["response"];
        trialIndex = trialIndex + 1;
        var demo2 = JSON.parse(JSON.stringify(data[trialIndex]))["response"];
        tData.age = Object.values(demo1)[0];
        tData.language = Object.values(demo1)[1];
        tData.nationality = Object.values(demo1)[2];
        tData.country = Object.values(demo1)[3];
        tData.gender = Object.values(demo2)[0];
        tData.student = Object.values(demo2)[1];
        tData.education = Object.values(demo2)[2];
        console.log("after demo:")
        console.log(trialIndex)

        trialIndex = trialIndex + 3;
        trial=JSON.parse(JSON.stringify(data[trialIndex]));
        var gen = [];
        var genRts = [];
        while(trial["trial_type"] == "survey-text") {
            if("response" in trial) {
                var res = trial["response"];
                gen.push(Object.values(res)[0]);
                genRts.push(trial["rt"]);
            }
            trialIndex=trialIndex+1;
            trial=JSON.parse(JSON.stringify(data[trialIndex]));
        }
        tData.generations = gen;
        tData.generationRts = genRts;
        console.log("after gen:")
        console.log(trialIndex)
        //finally, memory test
        trialIndex=trialIndex+1;//skip instructions
        trial=JSON.parse(JSON.stringify(data[trialIndex]));
        var memoryNames = [];
        var memoryBots = [];
        var memoryResponse = [];
        var memoryRts = [];
        var memoryCorrect = [];
        //list of names, list of responses, list of correct, list of bots in same order as names
        while(trial["trial_type"] == "canvas-button-response") {
            console.log(trial)
            var correctName = trial["name"]
            memoryNames.push(correctName);
            memoryBots.push(botNames[correctName]);
            memoryResponse.push(trial["names"][trial["response"]]);
            memoryRts.push(trial["rt"]);
            memoryCorrect.push((trial["names"][trial["response"]]) == correctName);
            trialIndex=trialIndex+1;
            trial=JSON.parse(JSON.stringify(data[trialIndex]));
        }  
        tData.memoryNames2 = memoryNames;
        tData.memoryBots2 = memoryBots;
        tData.memoryResponse2 = memoryResponse;
        tData.memoryRts2 = memoryRts;
        tData.memoryCorrect2 = memoryCorrect;
        return [tData];
        //tempData.memoryNames2 = memoryNames;
        //tempData.memoryBots2 = memoryBots;
        //tempData.memoryResponses2 = memoryResponse;
        //tempData.memoryCorrect2 = memoryCorrect;
        //return [tempData];
    }

export function makeQuery(data) {
    data = JSON.parse(JSON.stringify(data));
    console.log("Parsing data");
    data = reformatData(data);
    console.log("done");
    var table = 'robots';
    var keys = "";
    var keyArr = Object.keys(data[0]);
    for(var i=0; i<keyArr.length; i++) {
        keys = keys.concat(keyArr[i] + ", ");
    }
    keys = "(" + keys.substring(0, keys.length-2) + ")";
    var valuesList = [];
    var x = 0;
    for(var i=0; i<data.length; i++) {
        var dict = data[i];
        valuesList[x] = "";
        var valArray = Object.values(dict);
        for(var j=0; j<valArray.length; j++) {
            valuesList[x] = valuesList[x].concat("'" + valArray[j] + "', ");
        }
        x++;
    }
    var valuesStr = "";
    for (var i=0; i<valuesList.length; i++) {
        var values = valuesList[i];
        values = "(" + values.substring(0, values.length-2) + ")";
        valuesStr = valuesStr + values + ", ";
    }
    valuesStr = valuesStr.substring(0, valuesStr.length-2);
    console.log("INSERT INTO " + table + keys + " " + "VALUES " + valuesStr + ";");
    return "INSERT INTO " + table + keys + " " + "VALUES " + valuesStr + ";";
}
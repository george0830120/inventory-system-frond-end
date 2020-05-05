const notificationData = {
    "notification":"CONNECTIONREADY",
    "cid":0
}

const startInteractionData = {
    "notification":"READY",
    "portType": {
        "namespace":"testdata/GetDepartments.bpel",
        "local_name":"startInteractionPort"
    },
    "partnerLink":"Main",
    "pid":0,
    "operation":"start"
}

const unReadyStartInteractionData = {
    "notification":"UNREADY",
    "portType": {
        "namespace":"testdata/GetDepartments.bpel",
        "local_name":"startInteractionPort"
    },
    "partnerLink":"Main",
    "pid":0,
    "operation":"start"
}

const pageInteractionData = {
    "notification":"READY",
    "portType": {
        "namespace":"testdata/GetDepartments.bpel",
        "local_name":"pageInteractionPort"
    },
    "partnerLink":"Main",
    "pid":0,
    "operation":"viewDepartmentList"
}

const outputData = {
    "portType": {
        "namespace":"testdata/GetDepartments.bpel",
        "local_name":"outputPort"
    },
    "partnerLink":"Client",
    "pid":0,
    "type":{
        "namespace":"testdata/GetDepartments.bpel",
        "local_name":"outputPort.output"
    },
    "operation":"output",
    "content":"\n Vehecle<Voutput>\n<VMain.reply>\n"
}

exports.notificationData = notificationData;
exports.startInteractionData = startInteractionData;
exports.pageInteractionData = pageInteractionData;
exports.unReadyStartInteractionData = unReadyStartInteractionData;
exports.outputData = outputData;
export async function getConnectedNodes() {
    const currentblock = await getCurrentBlock();


    const nodespromise = fetch("http://chtaexplorer.mooo.com:3002/api/getpeerinfo");
    const nodesresponse = await nodespromise;
    const nodes = await nodesresponse.json();
    const retdata = [];

    const promises = nodes.map(async element => {
        const ipdatapromise = fetch("https://ipinfo.io/" + element.addr.split(":")[0] + "/?token=056c9cd2a02baa");
        const ipdataresponse = await ipdatapromise;
        const ipdata = await ipdataresponse.json();
        const blocksfromcurrent = currentblock - element.startingheight;

        retdata.push({
            "ipport": element.addr,
            "country": ipdata.country,
            "blocksfromcurrent": blocksfromcurrent,
            "subver": element.subver
        });
    })

    await Promise.all(promises);
    return retdata;
}

export async function getNodeCountries(nodes) {
    const countries = [];

    nodes.map(node => {
        if (countries.includes(node.country) == false) {
            countries.push(node.country);
        }
    });
    return countries;
}

export async function getCurrentBlock() {
    const currentblock = fetch("http://chtaexplorer.mooo.com:3002/api/getblockcount")
    const currentblockresponse = await currentblock;
    const currentblockdata = await currentblockresponse.json();
    return currentblockdata;
}
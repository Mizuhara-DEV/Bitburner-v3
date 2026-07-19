export async function main(ns: NS) {
    ns.disableLog('ALL');
    ns.ui.openTail();
    ns.clearLog();

    const ut: TienIch = new TienIch(ns);
    const data = ut.getHostOnly;
    ns.print(data.join('\n'));
}


class TienIch {
    private ns: NS;

    constructor(ns: NS) {
        this.ns = ns;
    }

    private DeepScaner() {
        const ds_host: string[] = ["home"];
        for (const host of ds_host) {
            const scaner = this.ns.scan(host);
            for (const h of scaner) {
                if (ds_host.includes(h)) continue;
                ds_host.push(h);
            }
        }
        return ds_host;
    }




    public get getHostOnly() { return this.DeepScaner().slice(1) }
}

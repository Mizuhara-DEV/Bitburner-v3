export async function main(ns: NS) {
    ns.disableLog("ALL")
    ns.ui.openTail()

    const muctieu: string = "n00dles"

    while (muctieu != null) {
        ns.clearLog()
        const svr = ns.getServer(muctieu)
        ns.print(`🏠: ${svr.hostname} | ${svr.ip}`)
        ns.print(`🪙: ${Math.floor(svr.moneyAvailable!)}/${svr.moneyMax}`)
        ns.print(`🔐: ${svr.hackDifficulty!.toFixed(3)}/${svr.baseDifficulty!.toFixed(3)}`)
        ns.print(`💾: ${svr.ramUsed}/${svr.maxRam} GB`)
        await ns.sleep(500)
    }
}
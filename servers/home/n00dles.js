/** @param {NS} ns */
export async function main(ns) {
    // ns.disableLog("ALL");
    ns.ui.openTail();
    ns.clearLog();

    var tagret = "n00dles";

    while (true) {
        await ns.hack(tagret);
        await ns.grow(tagret);
        await ns.weaken(tagret);
        await ns.weaken(tagret);
    }
}
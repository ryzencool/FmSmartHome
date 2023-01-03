import { atom } from "jotai";

const wsConnectionAtom = atom(null);

const statesStoreAtom = atom([]);

const keyMsgStoreAtom = atom(new Map());

const msgIdStoreAtom = atom(0);

const msgIdArrayAtom = atom([1, 2, 3, 4, 5]);

const deviceListAtom = atom([]);

const entityListAtom = atom([]);

const sendMsgAtom = atom(null);

const areaListAtom = atom([]);

export {
  msgIdArrayAtom,
  entityListAtom,
  wsConnectionAtom,
  sendMsgAtom,
  msgIdStoreAtom,
  statesStoreAtom,
  keyMsgStoreAtom,
  deviceListAtom,
  areaListAtom,
};

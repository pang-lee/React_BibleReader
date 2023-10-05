import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2 // 檢視 'Merge Process' 部分的具體情況
};

const myPersistReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(myPersistReducer);
const persistor = persistStore(store);

export { store, persistor };

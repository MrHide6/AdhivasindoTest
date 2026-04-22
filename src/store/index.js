import { createStore } from "vuex";
import task from "./modules/task";
import column from "./modules/column";

export default createStore ({
    modules: {
        task,
        column
    }
})
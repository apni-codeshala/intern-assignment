import { createSlice } from "@reduxjs/toolkit";

const addThoughtToLocalStorage = (id, thought) => {
  const thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];
  const newThought = { id, thought };
  thoughts.push(newThought);
  localStorage.setItem("thoughts", JSON.stringify(thoughts));
};

const removeThoughtFromLocalStorage = (id) => {
  let thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];
  thoughts = thoughts.filter((thought) => thought.id !== id);
  localStorage.setItem("thoughts", JSON.stringify(thoughts));
};

const initialState = JSON.parse(localStorage.getItem("thoughts")) || [];

const thoughtSlice = createSlice({
    name: "thoughts",
    initialState,
    reducers: {
        addThought: (state, action) => {
            const { id, quote } = action.payload;
            const newState = state.concat({ id, quote });
            addThoughtToLocalStorage(id, quote);
            return newState;
        },
        removeThought: (state, action) => {
            const id = action.payload;
            removeThoughtFromLocalStorage(id);
            return state.filter((thought) => thought.id !== id);
        },
        rehydrateThoughts: (state) => {
            const thoughtsFromStorage = JSON.parse(localStorage.getItem("thoughts")) || [];
            return thoughtsFromStorage;
        }
    }
});

export const { addThought, removeThought, rehydrateThoughts } = thoughtSlice.actions;
export default thoughtSlice.reducer;


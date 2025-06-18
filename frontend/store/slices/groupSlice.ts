import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
  members: Member[];
}

interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  selectedGroup: null,
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
      state.loading = false;
      state.error = null;
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const index = state.groups.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(g => g.id !== action.payload);
    },
    setSelectedGroup: (state, action: PayloadAction<Group | null>) => {
      state.selectedGroup = action.payload;
    },
    addMember: (state, action: PayloadAction<{ groupId: string; member: Member }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.members.push(action.payload.member);
      }
    },
    removeMember: (state, action: PayloadAction<{ groupId: string; memberId: string }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.members = group.members.filter(m => m.id !== action.payload.memberId);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setGroups,
  addGroup,
  updateGroup,
  deleteGroup,
  setSelectedGroup,
  addMember,
  removeMember,
  setLoading,
  setError,
} = groupSlice.actions;

export default groupSlice.reducer; 
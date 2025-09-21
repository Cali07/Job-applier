
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [
            { id: 1, name: "Thabang", surname: "Selepe", department: "HR", role: "Admin", email: "SelepeT@Invo", status: "Active", createdAt: new Date() },
            { id: 2, name: "Oarabile", surname: "Kau", department: "Operations", role: "System Administrator", email: "KauO@Invoke", status: "Active", createdAt: new Date() },
            { id: 3, name: "Onthatile", surname: "Kwena", department: "Finance", role: "Business Development Analyst ", email: "kwenaO@Invo", status: "Active", createdAt: new Date() },
            { id: 4, name: "Lungelo", surname: "Zulu", department: "Sales", role: "Asset Manager", email: "ZuluL@Invoke", status: "Inactive", createdAt: new Date() },
            { id: 5, name: "Respect", surname: "Khumalo", department: "IT", role: "Field Representative", email: "KhumaloR@In", status: "Active", createdAt: new Date() },
            { id: 6, name: "Khasongo", surname: "Yeye", department: "HR", role: "Admin", email: "YeyeK@Invok", status: "Active", createdAt: new Date() },
        ],
    }),
    actions: {
        addUser(user) {
            user.id = this.users.length + 1;
            user.createdAt = new Date();
            this.users.push(user);
        },
        updateUser(updatedUser) {
            const index = this.users.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
                this.users.splice(index, 1, updatedUser);
            }
        },
        loginUser(email, password) {
            // Implement login logic here
            console.log(`Logging in user with email: ${email}`);
        },
        resetPassword(email) {
            // Implement password reset logic here
            console.log(`Resetting password for user with email: ${email}`);
        },
    },
    getters: {
        filteredUsers: (state) => (filter) => {
            if (filter === "active") {
                return state.users.filter(user => user.status === "Active");
            } else if (filter === "inactive") {
                return state.users.filter(user => user.status === "Inactive");
            }
            return state.users; // Default: Show all users
        },
    },
});
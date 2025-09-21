// stores/auth.js
import {defineStore} from 'pinia'
import Swal from "sweetalert2";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    actions: {
        async login(email, password) {
            const {account} = useAppwrite()
            try {
                const session = await account.createEmailPasswordSession(email, password)
                console.log('Logged in:', session)
                this.user = session
                navigateTo('/user/services')
            } catch (err) {
                console.error('Login error:', err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err?.message || 'Login failed'
                })
            }
        },
        async getUser() {

            const {account} = useAppwrite()
            try {
                const user = await account.get()
                console.log('User details:', user)
                this.user = user // Save the user details
                return user // Return user details
            } catch (err) {
                console.error('Get user error:', err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err?.message || 'Failed to retrieve user details'
                })
                return null // Return null if error occurs
            }


        },
        async getUserProfile() {
            const {account, database,Query} = useAppwrite()
            try {
                const user = await account.get()
                console.log('User details:', user)
                this.user = user // Save the user details

                // Fetch user profile from database
                const databaseId = '68301b48003aeef7373b'; // Replace with your database ID
                const collectionId = 'user_profiles'; // Replace with your collection ID
                const profile = await database.listDocuments(
                    databaseId,
                    collectionId,
                    [Query.equal('user_id', user.$id)])

                if (profile.documents.length > 0) {
                    console.log('User profile:', profile.documents[0])
                    return profile.documents[0] // Return the first matching profile
                } else {
                    console.warn('No profile found for user:', user.$id)
                    return null // No profile found
                }
            } catch (err) {
                console.error('Get user profile error:', err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err?.message || 'Failed to retrieve user profile'
                })
                return null // Return null if error occurs
            }

        },
        async isLoggedIn() {
            const {account} = useAppwrite();
            try {
                const user = await account.get();
                console.log('User session exists:', user);
                this.user = user; // Save the user details if logged in
                return true; // User is logged in
            } catch (err) {
                console.warn('No active session:', err);
                this.user = null; // Clear stored session if not logged in
                return false; // User is not logged in
            }
        },
        async logout() {
            const {account} = useAppwrite()
            try {
                await account.deleteSession('current')
                this.user = null
                navigateTo('/') // or '/' depending on your route
            } catch (err) {
                console.error('Logout error:', err)
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: err?.message || 'An error occurred while logging out.'
                })
            }
        },
        async register(firstname, lastname, email, password, province) {
            const {account, database, ID} = useAppwrite()
            try {
                const userResponse = await account.create(
                    ID.unique(),
                    email,
                    password,
                    firstname
                );
                const userId = userResponse.$id; // Extract user ID from response

                // Step 2: Create a record in the specified collection
                const databaseId = '68301b48003aeef7373b'; // Replace with your database ID
                const collectionId = 'user_profiles'; // Replace with your collection ID

                const record = await database.createDocument(
                    databaseId,
                    collectionId,
                    ID.unique(), // Unique document ID
                    {
                        user_id: userId, // Store user ID
                        role: 'customer',
                        lastname: lastname,
                        province: province,
                        is_provider: false,
                    }
                );

                console.log('User created and record stored:', record);
                // const session = await account.createEmailPasswordSession(email, password)
                // console.log('Registered and logged in:', session)
                this.user = session
                navigateTo('/')
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Registration and login successful!'
                })
            } catch (err) {
                console.error('Registration error:', err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err?.message || 'Registration failed'
                })
            }
        },
        async googleLogin() {
            const {account} = useAppwrite()
            try {
                const session = await account.createOAuth2Session('google', 'http://localhost:3000', 'http://localhost:3000')
                console.log('Google logged in:', session)
                this.user = session
                navigateTo('/')
            } catch (err) {
                console.error('Google login error:', err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err?.message || 'Google login failed'
                })
            }
        }
    }
})
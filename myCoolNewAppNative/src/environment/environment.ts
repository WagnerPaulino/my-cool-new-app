import axios, { AxiosInstance } from "axios";

export function getHostBackend(): string {
    return `10.0.2.2:3000`;
}

export function getAxios(): AxiosInstance {
    return axios.create({
        baseURL: `http://${getHostBackend()}/api`
    });
}

export function getFirebaseConfig() {
    return {
        apiKey: "AIzaSyBqoIiOiiEgJ8iumz71H3fTLE05qW7IaJQ",
        authDomain: "my-cool-new-app-94ac1.firebaseapp.com",
        databaseURL: "https://my-cool-new-app-94ac1.firebaseio.com",
        projectId: "my-cool-new-app-94ac1",
        storageBucket: "my-cool-new-app-94ac1.appspot.com",
        messagingSenderId: "466887974288",
        appId: "1:466887974288:android:886f01387aa90449da6715",
        measurementId: "G-8CL21547L3"
    };
}
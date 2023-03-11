import axios from "axios";
import {BASEURL} from "@/constants";

const axiosService = axios.create({baseURL:BASEURL});

export {
    axiosService
}

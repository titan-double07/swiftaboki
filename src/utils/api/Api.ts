import axios, { AxiosError } from "axios";
import Nprogress from "nprogress";
import "../../styles/nprogress.css";

const ApiFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
  withCredentials: true,
});

const onRequest = (request: any) => {
  Nprogress.start();
  return request;
};

const onRequestError = (error: any) => {
  Nprogress.done();
  console.log('request error', error);
  return Promise.reject(error);
};

const onResponse = (response: any) => {
  Nprogress.done();
  return response;
};

const onResponseError = (error: any) => {
  Nprogress.done();

  // Check if the error is a CORS error
  if (error.response && error.response.status === 0) {
    // CORS error
    error.message = "CORS error";
  }

  // handle when the error does not have a response
  if (!error.response) {
    error.response = {
      status: 400,
    };
  }

  return Promise.reject(error);
};

ApiFetcher.interceptors.request.use(onRequest, onRequestError);
ApiFetcher.interceptors.response.use(onResponse, onResponseError);

export default ApiFetcher;

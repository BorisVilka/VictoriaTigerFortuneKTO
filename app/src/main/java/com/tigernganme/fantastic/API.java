package com.tigernganme.fantastic;


import retrofit2.Call;
import retrofit2.http.GET;

public interface API {

    @GET("/qH5vZ7YD")
    Call<Answer> getAns();

    @GET("/qH5vZ7YD?setting=ok")
    Call<Answer2> getAns2();

}
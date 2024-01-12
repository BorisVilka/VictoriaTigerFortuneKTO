package com.tigernganme.fantastic;

import com.google.gson.annotations.SerializedName;

public class Answer {

    @SerializedName("lose")
    String lose;

    public String getLose() {
        return lose;
    }

    public void setLose(String lose) {
        this.lose = lose;
    }

    public Answer() {

    }


}
package com.example.contacts.model;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "sessions")
@Getter
@Setter
public class Sessions {
  @Id
  @SerializedName("session_token")
  private String sessionToken;
  @SerializedName("user_id")
  private Integer userId;
  @SerializedName("expiry_time")
  private Timestamp expiryTime;
}

package com.example.contacts.model;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "contacts")
@Getter
@Setter
public class Contact {
  @Id
  private Integer id;
  @SerializedName("user_id")
  private Integer userId;
  private String name;
  private String contact;
  private String email;
  private String address;
  private Integer score;
}

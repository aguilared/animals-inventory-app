import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";

import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import { AppConfig } from "../../../../app.config";
import { Stack, useSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const { API_TOKEN, API_URL, BASE_URL_IMAGES } = Constants.manifest
  ?.extra as AppConfig;

type FormData = {
  id: number;
  name: string;
  birthdate: string;
  owner_id: number;
  clase_id: number;
  tipopart: string;
  hierro: string;
  mother: string;
  info: string;
  alive: string;
  image: boolean;
};

export default function AnimalEdit() {
  const { animal } = useSearchParams();
  const ENDPOINT = API_URL + "animals/" + animal;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [owner_id, setOwner_id] = useState("");
  const [clase_id, setClase_id] = useState("");
  const [tipopart, setTipopart] = useState("");
  const [hierro, setHierro] = useState("");
  const [mother, setMother] = useState("");
  const [info, setInfo] = useState("");
  const [alive, setAlive] = useState("");
  const [owner, setOwner] = useState("");
  const [clase, setClase] = useState("");
  const [loading, setLoading] = useState(false);
  const { status, data, error, isLoading, refetch } = useQuery(
    ["animalEdit"],
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      console.log("ANIMAL", res.data);
      setId(res.data.id);
      setName(res.data.name);
      return res.data;
    },
    { staleTime: 6000 }
  );

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data) => {
    console.log("DATAFORMONSUBMIT", data);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log("errors", errors);
  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Stack.Screen options={{ title: data.name }} />

        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          defaultValue={name}
          {...register("name", {
            required: "Required",
            minLength: 1,
            maxLength: 39,
          })}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(name)}
            />
          )}
          name="name"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Birthdate</Text>
        <Controller
          control={control}
          defaultValue={data.birthdate}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(data.birthdate)}
            />
          )}
          name="birthdate"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Owner</Text>
        <Controller
          control={control}
          defaultValue={data.owner_id}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(data.owner_id)}
            />
          )}
          name="owner_id"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Clase</Text>
        <Controller
          control={control}
          defaultValue={data.clase_id}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(data.clase_id)}
            />
          )}
          name="clase_id"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Tipopart</Text>
        <Controller
          control={control}
          defaultValue={data.tipopart}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(data.tipopart)}
            />
          )}
          name="tipopart"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Hierro</Text>
        <Controller
          control={control}
          defaultValue={data.hierro}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(data.hierro)}
            />
          )}
          name="hierro"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Tipopart</Text>
        <Controller
          control={control}
          defaultValue={data.tipopart}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(data.tipopart)}
            />
          )}
          name="tipopart"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Mother</Text>
        <Controller
          control={control}
          defaultValue={data.mother}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(data.mother)}
            />
          )}
          name="mother"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Info</Text>
        <Controller
          control={control}
          defaultValue={data.info}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={String(data.info)}
            />
          )}
          name="info"
          rules={{ required: true }}
        />

        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title="Reset"
            onPress={() => {
              reset({
                firstName: "Bill",
                lastName: "Luo",
              });
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title="Button"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

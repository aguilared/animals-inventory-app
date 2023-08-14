import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

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

  const onSubmit = async (animalE: any) => {
    console.log("DATATOSUBMIT", animalE);
    const ENDPOINT = API_URL + "animals/update/";

    const parsedata = {
      alive: animalE.alive,
      birthdate: animalE.birthdate,
      clase_id: Number(animalE.clase_id),
      hierro: animalE.hierro,
      id: Number(animalE.id),
      info: animalE.info,
      mother: animalE.mother,
      mother_id: animalE.mother_id,
      name: animalE.name,
      owner_id: Number(animalE.owner_id),
      tipopart: animalE.tipopart,
    };
    try {
      const result = await fetch(ENDPOINT, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedata),
      });
      refetch();
      //setModalEditar(false);
    } catch (error) {
      console.log(error);
    }
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

        <Text style={styles.label}>ID</Text>
        <Controller
          name="id"
          control={control}
          defaultValue={data.id}
          render={({ field: { value } }) => (
            <TextInput
              style={styles.input}
              label="ID"
              testID="input"
              mode="outlined"
              keyboardType="numeric"
              value={String(data.id)}
              disabled={true}
            />
          )}
        />
        {errors.id && <Text>This is required.</Text>}

        <Text style={styles.label}>Name</Text>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          defaultValue={data.name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              testID="input"
              mode="outlined"
              onBlur={onBlur}
              value={value}
              onChangeText={(value) => onChange(value)}
              ref={ref}
            />
          )}
        />

        <Text style={styles.label}>Birthdate</Text>
        <Controller
          name="birthdate"
          control={control}
          rules={{ required: true }}
          defaultValue={data.birthdate}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              value={value}
              onChangeText={(value) => onChange(value)}
              ref={ref}
            />
          )}
        />
        <Text style={styles.label}>Owner</Text>
        <Controller
          control={control}
          defaultValue={data.owner_id}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={ref}
            />
          )}
          name="owner_id"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Clase</Text>
        <Controller
          control={control}
          defaultValue={data.clase_id}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={ref}
            />
          )}
          name="clase_id"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Tipopart</Text>
        <Controller
          control={control}
          defaultValue={data.tipopart}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={ref}
            />
          )}
          name="tipopart"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Hierro</Text>
        <Controller
          control={control}
          defaultValue={data.hierro}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={ref}
            />
          )}
          name="hierro"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Tipopart</Text>
        <Controller
          control={control}
          defaultValue={data.tipopart}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={ref}
            />
          )}
          name="tipopart"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Mother</Text>
        <Controller
          control={control}
          defaultValue={data.mother}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={ref}
            />
          )}
          name="mother"
          rules={{ required: true }}
        />
        <Text style={styles.label}>Info</Text>
        <Controller
          control={control}
          defaultValue={data.info}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.inputarea}
              testID="input"
              mode="outlined"
              multiline
              numberOfLines={5}
              onBlur={onBlur}
              value={value}
              onChangeText={(value) => onChange(value)}
              ref={ref}
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
                name: "",
                lastName: "Luo",
              });
              refetch;
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
  inputarea: {
    backgroundColor: "white",
    borderColor: "none",
    padding: 10,
    borderRadius: 4,
    height: 100,
    textAlignVertical: "top",
  },
});

import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";

import {
  Subheading,
  Surface,
  Divider,
  List,
  Appbar,
  useTheme,
} from "react-native-paper";
import { Text, View } from "../../../components/Themed";
import HTMLView from "react-native-htmlview";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  useQuery,
  QueryClient,
  onlineManager,
  focusManager,
  QueryClientProvider,
} from "@tanstack/react-query";

import NetInfo from "@react-native-community/netinfo";
import useAppState from "react-native-appstate-hook";
import Constants from "expo-constants";
import { AppConfig } from "../../../app.config";

const { API_TOKEN, API_URL, BASE_URL_IMAGES } = Constants.manifest
  ?.extra as AppConfig;

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected);
  });
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function Animal() {
  const { animal } = useSearchParams();
  console.log("ANIMALID", animal);
  const router = useRouter();

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

  const ENDPOINT = API_URL + "animals/" + animal;
  console.log("ENDPOINT", ENDPOINT);

  const { status, data, error, isLoading, refetch } = useQuery(
    ["animalx"],
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      return res.data;
    },
    { staleTime: 6000 }
  );

  //setLoading(true);
  console.log("DATA", data);

  //const { name, clase } = data;
  //console.log("NAME", name);
  //console.log("CLASE", clase);
  //const { id, description } = clase;
  const obj = JSON.stringify(data);
  console.log("DATArOBJ", obj);
  //setId(data.id);
  //const {
  //clase: { id },
  //} = data;
  //console.log("CLASEID", id);
  //console.log("DDESCRIPTION", description);

  const user = {
    name: "Manz",
    role: "streamer",
    attributes: {
      height: 183,
      favColor: "blueviolet",
      hairColor: "black",
    },
  };
  console.log("USER", user);
  const { attributes } = user;
  console.log("ATTRIBUTES", attributes);
  const {
    attributes: { height },
  } = user;
  console.log("height", height);

  /*
  setId(data.id);
  setName(data.name);
  setBirthdate(data.birthdate);
  setOwner_id(data.owner_id);
  setClase_id(data.clase_id);
  setTipopart(data.tipopart);
  setHierro(data.hierro);
  setMother(data.mother);
  setInfo(data.info);
  setAlive(data.alive);
  setOwner(data.owner);
  setClase(data.clase);
  setLoading(false);
*/
  useAppState({
    onChange: onAppStateChange,
  });

  const dates: any = new Date();
  const titulo = "Animal al " + convertDate(dates);
  const titulo1 = "Gonzalera Ranch";
  if (!data) {
    return null;
  }
  return (
    <Surface style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Stack.Screen options={{ title: data.name }} />

        <Subheading style={styles.title}>{titulo1}</Subheading>
        <Subheading style={styles.title}>{titulo}</Subheading>
        <Divider style={{ backgroundColor: "gray", marginTop: 10 }} />
        <ScrollView>
          <List.Section
            style={{
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <Text style={styles.title1}>{`Animal Id: ${data.id}`}</Text>
            <Text style={styles.title1}>{`Name: ${data.name}`}</Text>
            <Text
              style={styles.title1}
            >{`Clase: ${data.clase_id} ${data.clase.description}`}</Text>
            <Text style={styles.title1}>{`Mother: ${data.mother}`}</Text>
            <Text style={styles.title1}>{`Owner: ${data.owner.name}`}</Text>
            <Text style={styles.title1}>{`Birthdate: ${convertDate(
              data.birthdate
            )}`}</Text>
            <HTMLView value={`Infos: ${data.info}`} stylesheet={styles.p} />

            <Image
              source={{ uri: BASE_URL_IMAGES + `${data.id}` + ".jpg" }}
              style={[
                styles.image,
                {
                  borderColor: "gray",
                },
              ]}
            />
            <Image
              source={{ uri: BASE_URL_IMAGES + `${data.id}` + "_1.jpg" }}
              style={[
                styles.image,
                {
                  borderColor: "gray",
                },
              ]}
            />

            <Divider style={{ backgroundColor: "gray", marginTop: 30 }} />
            <Divider style={{ backgroundColor: "gray", marginTop: 30 }} />
          </List.Section>
        </ScrollView>
      </QueryClientProvider>
    </Surface>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#D5DBDB",
    height: 30,
    fontSize: 18,
  },
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "monospace",
    marginTop: 1,
    marginBottom: 1,
  },
  p: {
    fontSize: 38,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 3,
    marginLeft: 3,
  },
  title: {
    marginTop: 5,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#0F7694",
    borderRadius: 3,
  },
  title11: {
    marginTop: 1,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: 19,
    fontWeight: "bold",
  },
  title1: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 5,
    fontSize: 17,
  },
  title3: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
    color: "blue",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  label: {
    paddingVertical: 5,
    marginLeft: 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 16,
    height: 18,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 1,
    marginBottom: 1,
  },
  inputMulti: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 14,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
    borderRadius: 20,
    width: "100%",
    height: 240,
  },
});

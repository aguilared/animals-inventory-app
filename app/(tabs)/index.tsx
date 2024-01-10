import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";

import { Link, Stack } from "expo-router";
import {
  Subheading,
  Surface,
  Divider,
  List,
  Appbar,
  useTheme,
} from "react-native-paper";
import { Text, View } from "../../components/Themed";
import HTMLView from "react-native-htmlview";

import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useRef, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  useQuery,
  onlineManager,
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { FlashList } from "@shopify/flash-list";
import Constants from "expo-constants";
import { AppConfig } from "../../app.config";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const { API_TOKEN, API_URL, BASE_URL_IMAGES } = Constants.manifest
  ?.extra as AppConfig;

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

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function TabAnimalScreen() {
  const ENDPOINT = API_URL + "animals";
  //console.log("ENDPOINT", ENDPOINT);

  const { status, data, error, isLoading, refetch } = useQuery(
    ["animals"],
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      //console.log("DATA1", res);
      return res.data;
    },
    { staleTime: 6000 }
  );

  const firstTimeRef = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );

  const { width } = useWindowDimensions();
  const innerWindow = width - 48;
  const dates: any = new Date();
  const titulo = "Inventarys Animals : " + convertDate(dates);
  const titulo1 = "Gonzalera Ranch";
  const navigation = useNavigation();
  return (
    <Surface style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Subheading style={styles.title}>{titulo1}</Subheading>
        <Subheading style={styles.title}>{titulo}</Subheading>
        <Divider style={{ backgroundColor: "gray", marginTop: 10 }} />

        <FlashList
          data={data}
          renderItem={({ item }) => (
            <List.Section
              style={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <Appbar.Header style={styles.header}>
                <Appbar.Content
                  titleStyle={styles.header}
                  title={`
                  Id:${item.id}`}
                />
                <Link
                  href={{
                    pathname: "/(app)/animal/update/modal",
                    params: {
                      animal: item.id,
                    },
                  }}
                  style={styles.link}
                >
                  <Appbar.Action icon="eye" />
                </Link>
                <Link
                  href={{
                    pathname: "/(app)/animal/update/[animal]",
                    params: {
                      animal: item.id,
                    },
                  }}
                  style={styles.link}
                >
                  <Appbar.Action icon="pencil" />
                </Link>
                <Appbar.Action icon="delete" onPress={() => alert("Search")} />
                <Appbar.Action
                  icon="plus"
                  onPress={() =>
                    navigation.navigate("ModalBitaEventsAdd", {
                      id: item.id,
                      bitacora_id: item.bitacora_id,
                      event_date: item.event_date,
                      tipo_event_id: item.tipo_event_id,
                      owner: item.events_id,
                      event: item.event.description,
                      tipoevent: item.tipoEvent.description,
                      description: item.description,
                    })
                  }
                />
              </Appbar.Header>

              <Link
                href={{
                  pathname: "/(app)/animal/[animal]",
                  params: {
                    animal: item.id,
                  },
                }}
                style={styles.link}
              >
                <Text style={styles.linkText}>{`Animal Id: ${item.id}`}</Text>
              </Link>
              <Text style={styles.title1}>{`Name: ${item.name}`}</Text>
              <Text
                style={styles.title1}
              >{`Clase: ${item.clase_id} ${item.clase.description}`}</Text>
              <Text style={styles.title1}>{`Mother: ${item.mother}`}</Text>
              <Text style={styles.title1}>{`Owner: ${item.owner.name}`}</Text>
              <Text style={styles.title1}>{`Birthdate: ${convertDate(
                item.birthdate
              )}`}</Text>
              <HTMLView value={`Infos: ${item.info}`} stylesheet={styles.p} />

              <Image
                source={{ uri: BASE_URL_IMAGES + `${item.id}` + ".jpg" }}
                style={[
                  styles.image,
                  {
                    borderColor: "gray",
                  },
                ]}
              />

              <Divider style={{ backgroundColor: "gray", marginTop: 30 }} />
            </List.Section>
          )}
          estimatedItemSize={200}
          keyExtractor={(item, index) => index.toString()}
        />
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
  link: {
    marginTop: 1,
    marginBottom: 1,
  },
  linkText: {
    color: "#2e78b7",
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 5,
    fontSize: 17,
  },
});

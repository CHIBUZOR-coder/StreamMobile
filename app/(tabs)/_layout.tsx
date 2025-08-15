import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
  const { userData } = useUserStore();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const TabIcon = ({ focused, title, icon1 }: any) => {
    return (
      <View
        style={{
          backgroundColor: focused ? "rgba(168, 181, 219, 1)" : "",

          boxShadow: focused ? "0px 0px 6px 3px rgba(255, 255, 255, 0.5)" : "", // Custom web shadow
        }}
        className={`items-center justify-center min-w-16 min-h-16 rounded-full `}
      >
        {icon1}
        <Text
          style={{
            fontSize: 12,
            color: focused ? "black" : "rgba(168, 181, 219, 1)",
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modal
        visible={showLoginModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLoginModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Text
              className="text-white"
              style={{ fontSize: 16, marginBottom: 10, textAlign: "center" }}
            >
              You need to register or log in to access your profile.
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#007BFF",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={() => {
                router.push({ pathname: "/pages/login" });
                setShowLoginModal(false);
                console.log("show:", showLoginModal);

                // Navigate to register or login page
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Go to Register
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: "gray",
              }}
              onPress={() => setShowLoginModal(false)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Tabs
        screenOptions={{
          tabBarIconStyle: {
            width: "100%",
            height: "100%",
            // backgroundColor:'yellow',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(2, 0, 19, 0.7)",
            borderRadius: 50,
            marginHorizontal: 10,
            marginVertical: 10,
            height: 70,
            borderWidth: 1,
            borderTopWidth: 1,
            borderColor: "rgba(168, 181, 219, 1)",
            overflow: "hidden",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            lazy: true,
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View className="flex-1 justify-center items-center ">
                <TabIcon
                  focused={focused}
                  title="Home"
                  icon1={
                    <Ionicons
                      name="home"
                      size={18}
                      color={focused ? "black" : "rgba(168, 181, 219, 1)"}
                    />
                  }
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            lazy: true,
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Search"
                icon1={
                  <Ionicons
                    name="search"
                    size={18}
                    color={focused ? "black" : "rgba(168, 181, 219, 1)"}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              if (!userData || Object.keys(userData).length === 0) {
                setShowLoginModal(true);
              }
            },
          }}
          options={{
            lazy: true,
            title: "Profile",
            headerShown: false,
            tabBarLabel: () => null, //this will remove the default label so you can use
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon1={
                  <Ionicons
                    name="person"
                    size={18}
                    color={focused ? "black" : "rgba(168, 181, 219, 1)"}
                  />
                }
                title="Profile"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                title="Saved"
                icon1={
                  <Ionicons
                    name="bookmarks"
                    size={18}
                    color={focused ? "black" : "rgba(168, 181, 219, 1)"}
                  />
                }
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default _layout;

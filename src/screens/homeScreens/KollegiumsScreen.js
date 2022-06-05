import { StyleSheet, Text, View, Keyboard } from "react-native";
import { useState, useCallback, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { getKollegiums } from "../../functions/KollegiumsFunctions";
import { useRecoilState } from "recoil";
import { kollegiumsAtom } from "../../atoms/KollegiumsAtom";
import { kollegiumsFiltersAtom } from "../../atoms/KollegiumsFiltersAtom";
import KollegiumCard from "../../components/KollegiumCard";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { TextInput } from "react-native";
import { kollegiumsSelectedFiltersAtom } from "../../atoms/KollegiumsSelectedFiltersAtom";
import PrimaryButton from "../../components/PrimaryButton";

const KollegiumsScreen = ({ navigation }) => {
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);
  const [kollegiumsFilters, setKollegiumsFilters] = useRecoilState(
    kollegiumsFiltersAtom
  );
  const [kollegiumsSelectedFilters, setKollegiumsSelectedFilters] =
    useRecoilState(kollegiumsSelectedFiltersAtom);

  const [filteredKollegiums, setFilteredKollegiums] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const unsubscribe = getKollegiums(setKollegiums);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const filtered = kollegiums.filter((kollegium) => {
      return kollegiumsFilters.every((f) => f(kollegium));
    });

    setFilteredKollegiums(filtered);
  }, [kollegiums, kollegiumsFilters]);

  const renderKollegium = ({ item }) => (
    <KollegiumCard
      onPress={() =>
        navigation.navigate("KollegiumsDetails", {
          kollegiumId: item.id,
        })
      }
      kollegium={item}
    />
  );

  //Bottom Sheet Ref
  const bottomSheetRef = useRef(null);
  //Bottom Sheet SnapPoints
  const snapPoints = useMemo(() => ["90%", "90%"], []);

  const handleFilter = () => {
    if (!showFilters) {
      setShowFilters(true);
    } else {
      bottomSheetRef.current.expand();
    }
  };

  const handleApplyFilter = () => {
    const filters = [];
    //decapsulation
    const {
      zipcode,
      priceMin,
      priceMax,
      dogsAllowed,
      catsAllowed,
      laundry,
      courtyard,
    } = kollegiumsSelectedFilters;

    //Apply filters for zipcode
    if (zipcode) {
      filters.push((kollegium) => kollegium.postalCode == zipcode);
    }

    //Apply filters for minimum price
    if (priceMin) {
      filters.push((kollegium) => kollegium.priceMin >= priceMin);
    }

    //Apply filters for maximum price
    if (priceMax) {
      filters.push((kollegium) => kollegium.priceMax <= priceMax);
    }

    //Apply filters for dogs allowed
    if (dogsAllowed) {
      filters.push((kollegium) => kollegium.facilities.dogsAllowed == true);
    }

    //Apply filters for cats allowed
    if (catsAllowed) {
      filters.push((kollegium) => kollegium.facilities.catsAllowed == true);
    }

    //Apply filters for laundry
    if (laundry) {
      filters.push((kollegium) => kollegium.facilities.laundry == true);
    }

    //Apply filters for courtyard
    if (courtyard) {
      filters.push((kollegium) => kollegium.facilities.courtyard == true);
    }

    setKollegiumsFilters(filters);
    bottomSheetRef.current.close();
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleFilter}>
        <FontAwesome name="filter" />
        <Text>Filter</Text>
      </TouchableOpacity>
      <Text>{filteredKollegiums.length} kollegiums found</Text>
      <FlatList
        data={filteredKollegiums}
        keyExtractor={(kollegium) => `${kollegium.id}-${Math.random()}`}
        renderItem={renderKollegium}
      />
      {showFilters && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
        >
          <BottomSheetScrollView
            style={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              placeholder="zipcode"
              value={kollegiumsSelectedFilters.zipcode}
              onChangeText={(value) => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  zipcode: value,
                });
              }}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="priceMin"
              value={kollegiumsSelectedFilters.priceMin}
              onChangeText={(value) => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  priceMin: value,
                });
              }}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="priceMax"
              value={kollegiumsSelectedFilters.priceMax}
              onChangeText={(value) => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  priceMax: value,
                });
              }}
              keyboardType="number-pad"
            ></TextInput>

            <TouchableOpacity
              onPress={() => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  courtyard: !kollegiumsSelectedFilters.courtyard,
                });
              }}
            >
              <View
                style={
                  kollegiumsSelectedFilters.courtyard
                    ? styles.facilitySelected
                    : styles.facility
                }
              >
                <Text>Courtyard</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  laundry: !kollegiumsSelectedFilters.laundry,
                });
              }}
            >
              <View
                style={
                  kollegiumsSelectedFilters.laundry
                    ? styles.facilitySelected
                    : styles.facility
                }
              >
                <Text>Laundry</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  dogsAllowed: !kollegiumsSelectedFilters.dogsAllowed,
                });
              }}
            >
              <View
                style={
                  kollegiumsSelectedFilters.dogsAllowed
                    ? styles.facilitySelected
                    : styles.facility
                }
              >
                <Text>Dogs allowed</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  catsAllowed: !kollegiumsSelectedFilters.catsAllowed,
                });
              }}
            >
              <View
                style={
                  kollegiumsSelectedFilters.catsAllowed
                    ? styles.facilitySelected
                    : styles.facility
                }
              >
                <Text>Cats allowed</Text>
              </View>
            </TouchableOpacity>

            <PrimaryButton
              onPress={handleApplyFilter}
              title="Apply"
            ></PrimaryButton>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default KollegiumsScreen;

const styles = StyleSheet.create({
  facility: {
    borderWidth: "2",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  facilitySelected: {
    borderWidth: "2",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "blue",
  },
});

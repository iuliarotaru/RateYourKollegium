import {
  StyleSheet,
  View,
  Keyboard,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect, useMemo, useRef } from "react";
import { getKollegiums } from "../../functions/KollegiumsFunctions";
import { useRecoilState } from "recoil";
import { kollegiumsAtom } from "../../atoms/KollegiumsAtom";
import { kollegiumsFiltersAtom } from "../../atoms/KollegiumsFiltersAtom";
import KollegiumCard from "../../components/KollegiumCard";
import { FontAwesome } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { kollegiumsSelectedFiltersAtom } from "../../atoms/KollegiumsSelectedFiltersAtom";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { Colors } from "../../styles/Theme";
import CustomText from "../../components/CustomText";

const KollegiumsScreen = ({ navigation }) => {
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);
  //filter functionality states

  //state that contains the filtering logic for each chosen filter
  const [kollegiumsFilters, setKollegiumsFilters] = useRecoilState(
    kollegiumsFiltersAtom
  );

  //state for the ones that are selected inside the bottom sheet
  const [kollegiumsSelectedFilters, setKollegiumsSelectedFilters] =
    useRecoilState(kollegiumsSelectedFiltersAtom);

  //state for the ones that are shown in the kollegium list feed
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
    //decapsulation from the kollegiumSelectedFilters state
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

  const handleResetFilter = () => {
    setKollegiumsFilters([]);
    setKollegiumsSelectedFilters({});
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={handleFilter}
        style={styles.filterButtonContainer}
      >
        <FontAwesome name="filter" size={25} />
        <CustomText style={styles.filterButtonText}>Filter</CustomText>
      </TouchableOpacity>
      <CustomText style={styles.resultsText}>
        {filteredKollegiums.length} kollegiums found
      </CustomText>
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
          <ScrollView
            style={styles.filtersContainer}
            keyboardShouldPersistTaps="handled"
          >
            <CustomText style={styles.filterTitle}>Zipcode</CustomText>
            <TextInput
              placeholder="Zipcode"
              value={kollegiumsSelectedFilters.zipcode}
              onChangeText={(value) => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  zipcode: value,
                });
              }}
              keyboardType="number-pad"
            />

            <CustomText style={styles.filterTitle}>Minimum Price</CustomText>
            <TextInput
              placeholder="Minimum price"
              value={kollegiumsSelectedFilters.priceMin}
              onChangeText={(value) => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  priceMin: value,
                });
              }}
              keyboardType="number-pad"
            />

            <CustomText style={styles.filterTitle}>Maximum Price</CustomText>
            <TextInput
              placeholder="Maximum price"
              value={kollegiumsSelectedFilters.priceMax}
              onChangeText={(value) => {
                setKollegiumsSelectedFilters({
                  ...kollegiumsSelectedFilters,
                  priceMax: value,
                });
              }}
              keyboardType="number-pad"
            ></TextInput>
            <CustomText style={styles.filterTitle}>Facilities</CustomText>

            <View style={styles.facilitiesWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setKollegiumsSelectedFilters({
                    ...kollegiumsSelectedFilters,
                    courtyard: !kollegiumsSelectedFilters.courtyard,
                  });
                }}
                style={styles.facilityContainer}
              >
                <View
                  style={
                    kollegiumsSelectedFilters.courtyard
                      ? styles.facilitySelected
                      : styles.facility
                  }
                >
                  <CustomText
                    style={
                      kollegiumsSelectedFilters.courtyard
                        ? styles.facilityTextSelected
                        : styles.facilityText
                    }
                  >
                    Courtyard
                  </CustomText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setKollegiumsSelectedFilters({
                    ...kollegiumsSelectedFilters,
                    laundry: !kollegiumsSelectedFilters.laundry,
                  });
                }}
                style={styles.facilityContainer}
              >
                <View
                  style={
                    kollegiumsSelectedFilters.laundry
                      ? styles.facilitySelected
                      : styles.facility
                  }
                >
                  <CustomText
                    style={
                      kollegiumsSelectedFilters.laundry
                        ? styles.facilityTextSelected
                        : styles.facilityText
                    }
                  >
                    Laundry
                  </CustomText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setKollegiumsSelectedFilters({
                    ...kollegiumsSelectedFilters,
                    dogsAllowed: !kollegiumsSelectedFilters.dogsAllowed,
                  });
                }}
                style={styles.facilityContainer}
              >
                <View
                  style={
                    kollegiumsSelectedFilters.dogsAllowed
                      ? styles.facilitySelected
                      : styles.facility
                  }
                >
                  <CustomText
                    style={
                      kollegiumsSelectedFilters.dogsAllowed
                        ? styles.facilityTextSelected
                        : styles.facilityText
                    }
                  >
                    Dogs allowed
                  </CustomText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setKollegiumsSelectedFilters({
                    ...kollegiumsSelectedFilters,
                    catsAllowed: !kollegiumsSelectedFilters.catsAllowed,
                  });
                }}
                style={styles.facilityContainer}
              >
                <View
                  style={
                    kollegiumsSelectedFilters.catsAllowed
                      ? styles.facilitySelected
                      : styles.facility
                  }
                >
                  <CustomText
                    style={
                      kollegiumsSelectedFilters.catsAllowed
                        ? styles.facilityTextSelected
                        : styles.facilityText
                    }
                  >
                    Cats allowed
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonsContainer}>
              <PrimaryButton
                onPress={handleApplyFilter}
                title="Apply"
                style={{ marginTop: 20, flex: 1, marginRight: 10 }}
              ></PrimaryButton>
              <SecondaryButton
                onPress={handleResetFilter}
                title="Reset"
                style={{ marginTop: 20, flex: 1, marginRight: 10 }}
              ></SecondaryButton>
            </View>
          </ScrollView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default KollegiumsScreen;

const styles = StyleSheet.create({
  filterButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  filterButtonText: {
    fontSize: 14,
    marginLeft: 7.5,
  },
  resultsText: {
    fontSize: 14,
    marginLeft: "5%",
    marginTop: 15,
  },
  filtersContainer: {
    paddingVertical: 20,
    maxWidth: "90%",
    width: "100%",
    alignSelf: "center",
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  facilitiesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  facilityContainer: {
    marginRight: 10,
    marginBottom: 10,
  },
  facility: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    borderColor: Colors.secondary,
  },
  facilitySelected: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },
  facilityText: {
    fontWeight: "500",
  },
  facilityTextSelected: {
    color: Colors.light,
    fontWeight: "500",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});

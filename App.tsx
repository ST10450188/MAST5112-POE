import React, { useState , useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import CheckBox from '@react-native-community/checkbox';

interface Dish {
  id: number;
  name: string;
}

interface NewDish {
  name: string;
  description: string;
  course: string;
  price: number;
}

interface LoginScreenProps {
  handleUserSelection: (userType: string) => void;
}

const LoginScreen: React.FC<{ handleUserSelection: (userType: string) => void }> = ({ handleUserSelection }) => {
  return (
    <View style={styles.loginContainer}>
      <Image source={require('./assets/appLogo.png')} style={styles.logoImage2} />
      <Text style={styles.loginTitle}>Login</Text>
      {['Chef', 'Jaden', 'Isabella', 'Nathan'].map((user) => (
        <TouchableOpacity key={user} style={styles.loginButton} onPress={() => handleUserSelection(user)}>
          <Text style={styles.buttonText}>{user}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const dishArray: Dish[] = [
  { id: 1, name: "Hors D'Oeuvre" },
  { id: 2, name: "Amuse-Bouche" },
  { id: 3, name: "Soup" },
  { id: 4, name: "Salad" },
  { id: 5, name: "Appetiser" },
  { id: 6, name: "Fish" },
  { id: 7, name: "First Main Course" },
  { id: 8, name: "Palate Cleanser" },
  { id: 9, name: "Second Main Course" },
  { id: 10, name: "Cheese" },
  { id: 11, name: "Dessert" },
  { id: 12, name: "Mignardise" },
];

export default function App() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [dishlist, setDishList] = useState<NewDish[]>([]);
  const [activeScreen, setActiveScreen] = useState<string>('login');
const [userType, setUserType] = useState<string | null>(null); 

const [searchTerm, setSearchTerm] = useState<string>(''); // For the search input
const [searchResults, setSearchResults] = useState<NewDish[]>([]); // Search results

const handleSearch = () => {
  const results = dishlist.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setSearchResults(results);
};

const handleSelectDish = (dish: NewDish) => {
  setName(dish.name);
  setDescription(dish.description);
  setPrice(dish.price.toString());
  setCourse(dish.course);
  setSearchTerm(''); // Clear search field
  setSearchResults([]); // Clear search results
};

const handleDelete = () => {
  const updatedDishList = dishlist.filter((dish) => dish.name !== name);
  setDishList(updatedDishList);

  alert('Dish deleted successfully!');
  handleAdd(); // Clear fields after deleting
};

const handleAdd = () => {
  setName('');
  setDescription('');
  setPrice('');
  setCourse('');
};



const handleSaveDish = () => {
  let errors: string[] = [];

  if (!name) errors.push('Name is required');
  if (!description) errors.push('Description is required');
  if (!course) errors.push('Course is required');
  if (isNaN(Number(price)) || Number(price) <= 0)
    errors.push('The price must be a positive number');

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }

  const newDish: NewDish = {
    name: name.trim(),
    description: description.trim(),
    course: course.trim(),
    price: parseFloat(price),
  };

  const existingDishIndex = dishlist.findIndex((dish) => dish.name === name);

  if (existingDishIndex !== -1) {
    // Update existing dish
    const updatedDishList = [...dishlist];
    updatedDishList[existingDishIndex] = newDish;
    setDishList(updatedDishList);
  } else {
    // Add new dish
    setDishList([...dishlist, newDish]);
  }

  alert('Dish saved successfully!');
  handleAdd();
};

const [clientMenus, setClientMenus] = useState<{
  [clientName: string]: NewDish[];
}>({
  Jaden: [],
  Isabella: [],
  Nathan: [],
});

const handleLogout = () => {
  setUserType(null); // Reset userType
  setActiveScreen('login'); // Navigate back to login screen
};



      // this updates screen to seleted screen
  const navigateToScreen = (screen: string) => {
    if (screen === 'salad') {
      setActiveScreen('menu'); // Navigate to the MenuScreen when "salad" is clicked
    } else {
    setActiveScreen(screen);
    }
  };

  return (
    <LinearGradient       // background design
      colors={['#383838', '#1C2B09', '#FFFFFF']}
      start={{ x: 0.08, y: 0 }}
      end={{ x: 0.78, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {activeScreen === 'create' && (
          <>
            <View style={styles.headerContainer}>
            <View style={styles.logo}>
            <Image
              source={require('./assets/appLogo.png')} 
              style={styles.logoImage}
            />
            </View>

              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Set Menu</Text>
              </View>

              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
  <Text style={styles.buttonText2}>Log out</Text>
</TouchableOpacity>
            </View>

            
            <View style={styles.formContainer}>
<TextInput
  placeholder="Search for Dish"
  value={searchTerm}
  onChangeText={setSearchTerm}
  style={styles.input2}
  placeholderTextColor="#fff"
/>
              <FlatList
  data={searchResults}
  keyExtractor={(item) => item.name}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleSelectDish(item)}>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )}
  style={styles.flatList}
/>
<TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
  <Text style={styles.buttonText}>Search</Text>
</TouchableOpacity>
              <TextInput
                placeholder='Enter Dish Name'
                onChangeText={setName}
                value={name}
                style={styles.input}
                placeholderTextColor="#fff"
              />

              <TextInput
                placeholder='Enter Dish Description'
                onChangeText={setDescription}
                value={description}
                style={styles.descriptionInput}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="#fff"
              />

              <View style={styles.pickerWrapper}>
                <Picker
                  onValueChange={setCourse}
                  selectedValue={course}
                  style={styles.picker}
                  dropdownIconColor="#fff"
                >
                  <Picker.Item
                    label="Select Course"
                    value=""
                    style={styles.pickerItem}
                    color="#fff"
                  />
                  {dishArray.map((item) => (
                    <Picker.Item
                      label={item.name}
                      value={item.name}
                      key={item.id}
                      style={styles.pickerItem}
                      color="#fff"
                    />
                  ))}
                </Picker>
              </View>

              <TextInput
                placeholder='Set Price'
                onChangeText={setPrice}
                value={price}
                style={styles.input2}
                keyboardType="numeric"
                placeholderTextColor="#fff"
              />






            </View>

            <View style={styles.actionButtonsContainer}>
  <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
    <Text style={styles.buttonText}>Add</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={handleSaveDish} style={styles.saveButton}>
    <Text style={styles.buttonText}>Save Dish</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
    <Text style={styles.buttonText}>Delete</Text>
  </TouchableOpacity>
</View>

          </>
        )}

{activeScreen === 'home' && (
  <HomeScreen
    dishlist={dishlist}
    clientMenus={clientMenus}
    userType={userType}
    handleLogout={handleLogout} // Pass the logout function
  />
)}



{activeScreen === 'menu' && (
  <MenuScreen
    dishlist={dishlist}
    setClientMenus={setClientMenus}
    clientMenus={clientMenus}
    handleLogout={handleLogout} // Pass the logout function
  />
)}



{activeScreen === 'login' && (
  <LoginScreen
    handleUserSelection={(userType) => {
      setUserType(userType);
      setActiveScreen(userType === 'Chef' ? 'create' : 'home');
    }}
  />
)}

        {/* Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigateToScreen('create')}>
          <Image
              source={require('./assets/setMenuIcon.png')} 
              style={styles.navImage}
            />
          </TouchableOpacity>

          <TouchableHighlight style={styles.navButton} onPress={() => navigateToScreen('home')}>
          <Image
              source={require('./assets/homeIcon.png')} 
              style={styles.navImage}
            />
          </TouchableHighlight>
          <TouchableOpacity style={styles.navButton} onPress={() => navigateToScreen('salad')}>
          <Image
              source={require('./assets/menuIcon.png')} 
              style={styles.navImage}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

interface HomeScreenProps {
  dishlist: NewDish[];
}

const courseList = [
  { id: 1, name: "Hors D'Oeuvre", courseNum: [4, 5, 6, 7, 8, 9, 10, 12] },
  { id: 2, name: "Amuse-Bouche", courseNum: [12] },
  { id: 3, name: "Soup", courseNum: [12] },
  { id: 4, name: "Salad", courseNum: [5, 6, 1, 9, 10, 12] },
  { id: 5, name: "Appetiser", courseNum: [3, 4, 5, 6, 7, 8, 9, 10, 12] },
  { id: 6, name: "Fish", courseNum: [9, 10, 12] },
  { id: 7, name: "Main Course", courseNum: [3, 4, 5, 6, 7, 8, 9, 10, 12] },
  { id: 8, name: "Palate Cleanser", courseNum: [8, 9, 10, 12] },
  { id: 9, name: "Second Main Course", courseNum: [10, 12] },
  { id: 10, name: "Cheese", courseNum: [12] },
  { id: 11, name: "Dessert", courseNum: [3, 4, 6, 7, 8, 9, 10, 12] },
  { id: 12, name: "Mignardise", courseNum: [7, 8, 9, 10, 12] },
];

const HomeScreen: React.FC<{
  dishlist: NewDish[];
  clientMenus: { [clientName: string]: NewDish[] };
  userType: string | null;
  handleLogout: () => void; // Add handleLogout type
}> = ({ dishlist, clientMenus, userType, handleLogout }) => {


  
  const [totalCourses, setTotalCourses] = useState<string>(`${dishlist.length}`);
  const isChef = userType === 'Chef';
  const [menuItems, setMenuItems] = useState<NewDish[]>(
    isChef ? dishlist : clientMenus[userType as keyof typeof clientMenus] || []
  );
  const [averagePrices, setAveragePrices] = useState<{ name: string; price: number }[]>([]);
  const [selectedCourseType, setSelectedCourseType] = useState<number>(0); 

        // function to filter dishes by the course numbers
  const filterByCourseType = (courseNum: number) => {
    const filteredCourses = courseList.filter(course =>
      course.courseNum.includes(courseNum)
    );
    
    const filteredDishes = dishlist.filter(dish => {
      const matchedCourse = filteredCourses.find(course => course.name === dish.course);
      return matchedCourse !== undefined;
    });

    if (filteredDishes.length > 0) {
      const total = filteredDishes.reduce((acc, dish) => acc + dish.price, 0);
      const averagePrice = total / filteredDishes.length;

      setAveragePrices([{ name: `Average Price of ${courseNum}-course meal`, price: averagePrice }]);
    } else {
      setAveragePrices([]);
    }
  };

  const handleCourseTypeChange = (courseNum: number) => {
    setSelectedCourseType(courseNum);
    filterByCourseType(courseNum);
  };

  useEffect(() => {
    if (!isChef && userType) {
      setMenuItems(clientMenus[userType as keyof typeof clientMenus] || []);
    }
  }, [clientMenus, userType]);
  
  return (
    <LinearGradient
      colors={['#383838', '#1C2B09', '#FFFFFF']}
      start={{ x: 0.08, y: 0 }}
      end={{ x: 0.78, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.headerContainer}>
          <View style={styles.logo}>
            <Image source={require('./assets/appLogo.png')} style={styles.logoImage} />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText2}>
              {isChef ? 'Home' : `${userType}'s Menu`}
            </Text>
          </View>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton2}>
  <Text style={styles.buttonText2}>Log out</Text>
</TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.input}>Total Courses: {totalCourses}</Text>
        </View>

        {!isChef && userType && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Prepared Menu for {userType}</Text>
          </View>
        )}
        <View style={styles.menuItemsContainer}>
          <FlatList
            data={menuItems}
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <Text style={styles.menuTitle}>{item.course}:</Text>
                <Text style={styles.menuDescription}>{item.name}: {item.description}</Text>
              </View>
            )}
            keyExtractor={(item) => item.name}
            style={styles.flatList}
          />
        </View>

            {/* picker for course type */}
        <View style={styles.pickerWrapper2}>
          <Picker
            onValueChange={handleCourseTypeChange}
            selectedValue={selectedCourseType}
            dropdownIconColor="#fff"
            style={styles.picker}
          >
            <Picker.Item label="Select Meal Type" value={0} style={styles.pickerItem} />
            <Picker.Item label="3-course meal" value={3} style={styles.pickerItem} />
            <Picker.Item label="4-course meal" value={4} style={styles.pickerItem} />
            <Picker.Item label="5-course meal" value={5} style={styles.pickerItem} />
            <Picker.Item label="6-course meal" value={6} style={styles.pickerItem} />
            <Picker.Item label="7-course meal" value={7} style={styles.pickerItem} />
            <Picker.Item label="8-course meal" value={8} style={styles.pickerItem} />
            <Picker.Item label="9-course meal" value={9} style={styles.pickerItem} />
            <Picker.Item label="10-course meal" value={10} style={styles.pickerItem} />
            <Picker.Item label="12-course meal" value={12} style={styles.pickerItem} />
          
          </Picker>
        </View>

           {/* average course prices */}
        <View style={styles.menuItemsContainer2}>
        <FlatList
          data={averagePrices}
          renderItem={({ item }) => (
            <View style={styles.priceItem2}>
              <Text style={styles.priceText2}>{item.name}: R{item.price.toFixed(2)}</Text>
            </View>
          )}
          keyExtractor={(item) => item.name}
          horizontal
          style={styles.flatList}
        />
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

        // third screen, not populated yet (Create to complete my planned navigation)
        interface MenuScreenProps {
  dishlist: NewDish[];
  setClientMenus: React.Dispatch<
    React.SetStateAction<{ [clientName: string]: NewDish[] }>
  >;
  clientMenus?: { [clientName: string]: NewDish[] }; // Optional, if you need it
}

        const CustomCheckBox: React.FC<{ checked: boolean; onToggle: () => void }> = ({ checked, onToggle }) => {
          return (
            <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
              <View style={[styles.checkbox, checked && styles.checked]} />
            </TouchableOpacity>
          );
        };
        
        const MenuScreen: React.FC<MenuScreenProps & { handleLogout: () => void }> = ({
  dishlist,
  setClientMenus,
  handleLogout,
}) => {
          const [selectedCourse, setSelectedCourse] = useState<string>('');
          const [selectedDishes, setSelectedDishes] = useState<Set<string>>(new Set());
          const [clientName, setClientName] = useState<string>('Jaden');
        
          const toggleDishSelection = (dishName: string) => {
            const updatedSet = new Set(selectedDishes);
            if (updatedSet.has(dishName)) {
              updatedSet.delete(dishName);
            } else {
              updatedSet.add(dishName);
            }
            setSelectedDishes(updatedSet);
          };
        
          const filteredDishes = dishlist.filter((dish) => dish.course === selectedCourse);
        
          const handleSaveMenu = () => {
            const selectedMenuItems = dishlist.filter((dish) =>
              selectedDishes.has(dish.name)
            );
          
            setClientMenus((prevMenus: { [clientName: string]: NewDish[] }) => ({
              ...prevMenus,
              [clientName]: selectedMenuItems,
            }));
          
            alert(`Menu saved for ${clientName}`);
            setSelectedDishes(new Set());
          };
          
          
        
          return (
            <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" />
              <View style={styles.headerContainer}>
                <View style={styles.logo}>
                  <Image source={require('./assets/appLogo.png')} style={styles.logoImage} />
                </View>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.headerText}>Menu</Text>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton3}>
  <Text style={styles.buttonText2}>Log out</Text>
</TouchableOpacity>

              </View>
        
              {/* Course Picker */}
              <View style={styles.pickerWrapper2}>
                <Picker
                  selectedValue={selectedCourse}
                  onValueChange={(itemValue) => setSelectedCourse(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Course" value="" style={styles.pickerItem2} />
                  {[...new Set(dishlist.map((dish) => dish.course))].map((course) => (
                    <Picker.Item key={course} label={course} value={course} />
                  ))}
                </Picker>
              </View>
        
              {/* FlatList of Dishes */}
              <FlatList
                data={filteredDishes}
                renderItem={({ item }) => (
                  <View style={styles.menuItem}>
                    <Text style={styles.menuText}>{item.name}</Text>
                    <CustomCheckBox
                      checked={selectedDishes.has(item.name)}
                      onToggle={() => toggleDishSelection(item.name)}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.name}
                style={styles.flatList}
              />
        
              {/* Client Picker */}
              <View style={styles.pickerWrapper2}>
              <Picker
  selectedValue={clientName}
  onValueChange={(itemValue) => setClientName(itemValue)}
  style={styles.picker}
>
  {['Jaden', 'Isabella', 'Nathan'].map((client) => (
    <Picker.Item key={client} label={client} value={client} />
  ))}
</Picker>

              </View>
        
              {/* Save Button */}
              <TouchableOpacity onPress={handleSaveMenu} style={styles.saveButton2}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </SafeAreaView>
          );
        };
        


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 50,
  },
  logo: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#2c4c2c',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 45, 
  },
  logo2: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#2c4c2c',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5, 
  },
  logoText: {
    fontSize: 24,
  },
  headerTextContainer: {
    marginLeft: 60,
    backgroundColor: '#404040',
    padding: 10,
    borderRadius: 20,
    height: 65,
    width: 190,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 6,
    textAlign: 'center',
  },
  headerText2: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    paddingTop: 6,
    textAlign: 'center',
  },
  formContainer: {
    padding: 60,
    paddingBottom: 10,
    paddingTop: 10,
  },
  input: {
    backgroundColor: '#404040',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    color: '#fff',
    fontSize: 16,
    height: 50,
  },
  input2: {
    backgroundColor: '#404040',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
    height: 50,
  },
  descriptionInput: {
    backgroundColor: '#404040',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    color: '#fff',
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    backgroundColor: '#404040',
    borderRadius: 10,
    marginBottom: 25,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    backgroundColor: '#404040',
    height: 50,
    width: '100%',
    padding: 10,
    ...Platform.select({
      android: {
        color: '#fff',
      },
      ios: {
        color: '#fff',
      },
    }),
  },
  pickerItem: {
    backgroundColor: '#404040',
    fontSize: 16,
    ...Platform.select({
      android: {
        color: '#fff',
      },
      ios: {
        color: '#fff',
      },
    }),
  },
  pickerItem2: {
    backgroundColor: '#404040',
    fontSize: 16,
    ...Platform.select({
      android: {
        color: 'grey',
      },
      ios: {
        color: 'grey',
      },
    }),
  },
  searchButton: {
    backgroundColor: '#404040',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  deleteButton: {
    backgroundColor: '#404040',
    padding: 10,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#404040',
    padding: 10,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  saveButton2: {
    backgroundColor: '#404040',
    padding: 15,
    borderRadius: 20,
    width: '35%',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    marginBottom: 90,
    marginTop: 30,
    marginLeft: 150
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingTop: 4
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#262626',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    width: 40,
    height: 40,
    backgroundColor: '#404040',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#404040',
    padding: 10,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },  
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  screenText: {
    fontSize: 24,
    color: '#000',
    marginBottom: 20,
  },
  courseInfo: {
    padding: 20,
  },
  courseText: {
    color: '#fff',
    fontSize: 18,
  },
  menuItem: {
    backgroundColor: '#404040',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    color:'#fff',
    marginHorizontal: 30,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuDescription: {
    color: '#ccc',
    fontSize: 14,
  },
  priceInfoContainer: {
    padding: 20,
    marginTop: 20,
  },
  priceInfoTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceItem: {
    marginTop: 10,
  },
  priceText: {
    color: '#ccc',
    fontSize: 16,
  },
  menuItemsContainer: {
    padding: 15,
    flex: 1,  
  },
  flatList: {
    flexGrow: 1,          // this allows the flatList to move in container
  },
  logoImage: {
    width: 85,
    height: 85,
    resizeMode: 'center',
  },
  logoImage2: {
    width: 150,
    height: 150,
    resizeMode: 'center',
  },
  pickerWrapper2: {
    backgroundColor: '#404040',
    borderRadius: 10,
    marginBottom: 1,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 40,
  },
  flatList2: {
    flexGrow: 1,  
    backgroundColor: '#404040',  
    padding: 10,  
    marginTop: 20,  
  },
    
  priceItem2: {
    backgroundColor: '#404040',  
    padding: 15,  
    borderRadius: 10,  
    marginHorizontal: 10, 
    height: 55, 
  },
  
  priceText2: {
    color: '#fff',  
    fontSize: 16,  
    fontWeight: 'bold',  
  },
  
  priceListContainer: {
    paddingHorizontal: 15,  
    paddingVertical: 5, 
  },

  menuItemsContainer2: {
    padding: 45,
    paddingLeft: 65,
    flex: 1, 
    marginBottom: 50,
    height: 10,
  },

  navImage: {
    width: 55,
    height: 55,
    resizeMode: 'center',
  },

  loginButtonContainer: {
    width: '80%',
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#404040',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: 120,
  },
  menuItem2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#404040',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  menuItemText: {
    marginLeft: 10,
    flex: 1,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 30,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C2B09',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  menuContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C2B09',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10, // Space between title and picker
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  checkbox: {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#4caf50',
  },
  logoutButton: {
  backgroundColor: '#404040',
  padding: 10,
  borderRadius: 20,
  width: 70,
  height: 40,
  alignItems: 'center',
  margin: 5,
},
logoutButton2: {
  backgroundColor: '#404040',
  padding: 10,
  borderRadius: 20,
  width: 70,
  height: 40,
  alignItems: 'center',
  marginHorizontal: 5,
},
logoutButton3: {
  backgroundColor: '#404040',
  padding: 10,
  borderRadius: 20,
  width: 70,
  height: 40,
  alignItems: 'center',
  marginHorizontal: 5,
},
titleContainer: {
  padding: 15,
  backgroundColor: '#404040',  // Adjust based on your theme
  marginTop: 10,
  borderRadius: 10,
  marginBottom: 20,  // Add some space below the title
  marginHorizontal: 70
},

titleText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',  // White text color for contrast
  textAlign: 'center',
  textDecorationLine: 'underline'
},


  
});
const menuScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C2B09',
    justifyContent: 'flex-start', // Ensures content starts at the top of the screen
    marginBottom: 100, // Prevents content from being hidden behind the bottom navigation
  },
  picker: {
    backgroundColor: '#404040',
    color: '#fff',
    marginBottom: 15,
    borderRadius: 5,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#404040',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#404040',
    padding: 15,
    borderRadius: 20,
    width: '35%',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    marginTop: 20, // Adds space between menu items and save button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatList: {
    flexGrow: 1, // Allow FlatList to scroll properly
    marginBottom: 10, // Add spacing below search results
  },
  headerContainer: {
    marginBottom: 20, // Space between the title and content
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10, // Space between title and picker
  },
  logoImage: {
    width: 85,
    height: 85,
    resizeMode: 'center',
    marginBottom: 10, // Space between logo and title
  },
});







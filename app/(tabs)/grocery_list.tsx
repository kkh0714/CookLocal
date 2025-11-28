import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Common grocery items for autocomplete
const COMMON_GROCERIES = [
  '% Greek Yogurt', '% chocolate', '% mie complet g', '/ Medium Bread', 'Aicha Tomato Paste',
  'Aiguillettes de Poulet Rôti', 'Ain Atlas', 'Ain Saïss', 'Allumettes de Jambon', 'Ananas. Stücke',
  'Aquafina cl', 'Arándanos deshidratados', 'Assil', 'Avocado Oil Spray', 'Aïn Atlas cl',
  'Aïn Ifrane', 'Aïn Soltane', 'Bahia', 'Banane', 'Batchelors : Mushy Original',
  'Beurre Frais Pasteurisé', 'Beurre de cacahuètes', 'Bio Chocolat Noir %', 'Bio Knusper Müsli Früchte', 'Bio et équitable', 
  'Biscottes  Céréales', 'Bitter Extra Kraftig', 'Blanc de Poulet', 'Blueberries', 'Boisson à l’avoine',
  'Bouillon Légumes', 'Breakfast avocado', 'Brioche Tranchée Bio g', 'Brioche moins de sucre', 'Butter beans in water',      
  'CRISTALINE Eau De Source .L', 'Canneberges sucrées séchées', 'Carne de kebab pollo', 'Carottes rapees citron dnp g', 'Carré Frais',
  'Cheddar', 'Chocolat Noir % cacao', 'Chocolat au lait', 'Chocolat en poudre', 'Chocolat noir',
  'Chopped Tomatoes', 'Chopped Tomatoes pk', 'Chunky chopped tomatoes', 'Ciel', 'Ciel cl',
  'Classic Torinesi Breadsticks', 'Coca', 'Cocoa Orange', 'Coke Zero', 'Coke Zero can',
  'Coleslaw', 'Compote Pomme Nature', 'Concentré de tomates Aicha', 'Cornichons aigres', 'Courgettes à la Provençale /',     
  'Cream cheese', 'Cremy', 'Croissance réduit en sucre', 'Crunchy oats&honey', 'Crème Yaourt Brassé �',
  'DANONE ASSIL BANANE', 'Dalaa  feuilles', 'Danino', 'Dark Rye Crispbread', 'Dark Rye Sourdough',
  'Dark chocolate', 'Datteln', 'Dattes Deglet Nour', 'Delizias pechuga de pavo', 'Double Concentré de Tomates',
  'Dátiles desecados sin hueso', 'Eau', 'Eau De Source', 'Eau Minérale Naturelle', 'Eau de table',
  'Eau minéral naturelle', 'Eau minérale naturelle', 'Edelbitter % Cacao', 'Emincés de Poulet', 'Emotion',
  'Everyday White Rolls', 'Excellence % Cacao Rich Dark', 'Extra dark % Cocoa', 'Eyoo cover', 'FIBRES',
  'Fairtrade Bananas', 'Familia g', 'Figue & son', 'Filet de poulet rôti', 'Finn Crisp Original',
  'Fourrés Chocolat Noir', 'Fraise', 'Fromage blanc nature', 'Fuet Espetec Extra', 'GOLDEN VEGETAB',
  'Galletas fibra zero azúcares', 'Gehackte Tomaten', 'Geröstete Mandel Ohne Zucker', 'Ghilal Yaourt zr', 'Greek Style Yoghurt',
  'Green Tea', 'Grilletines blé complet', 'HERTA bacon T', 'Hafer Milch', 'Haricots Verts extra',
  'Hawai Tropical', 'Henry’s', 'Italian Chopped Tomatoes', 'Jambon Simplement Bio', 'Jamila رايبي',
  'Jamón Serrano', 'Jamón cocido extra', 'Jamón cocido lonchas', 'Jasons Sourdough', 'Jben',
  'Jebli', 'Jus joker multifruit', 'KING COOKIES', 'Kinder Bueno', 'King cookies choco',
  'Kiwi Sungold', 'LBEN CARTON PASTEURISER', 'La gâche tranchée', 'La salvetat', 'Lait',
  'Lait Entier UHT', 'Lait Frais  jours', 'Lait U.H.T entier', 'Le Beurre Tendre Doux', 'Le Lait demi écrémé',
  'Le Supérieur', 'Le Torchon', 'Le Tranché Fin', 'Le bon lait', 'Lightly Salted Corn Cakes',
  'Lightly sea salted crisps', 'Lincolnshire sausages', 'Live Rostoy', 'Lomo embuchado', 'Mandelmilch mit Zucker',
  'Maxi brassé', 'Maxi pavo finas lonchas', 'Melocoton en almibar', 'Mix énergie', 'Mogu litchi',
  'Momo black', 'Muscly la force pour grandir', 'NATURAL YOGURT', 'Naked Bacon', 'Nescafé Classic',
  'Nestlé Dessert', 'Noix de coco râpée Belbake', 'Nutella', 'Oat Drink Barista Edition', 'Olives vertes dénoyautées',       
  'Orange juice', 'Organic % Dark Chocolate Bar', 'Original Taste', 'Oulmes Eau Gazeuse', 'Oven Baked Sweet Potato Fries',   
  'PECHUGUITA DE POLLO', 'Pain De Mie Bio', 'Pain grillé au blé complet', 'Pains au lait x', 'Panés de poulet x',
  'Paradizniki suseni lidl', 'Passata Sieved Tomatoes', 'Pechuga de Pavo Cocida %', 'Perly façon tarte aux fraises', 'Petit beurre',
  'Petits Pois & Carottes', 'Philadelphia', 'Piadina', 'Pitted Dates', 'Piña en su Jugo',
  'Poivrons grillés', 'Pomme', 'Pomme � � Noisette�', 'Pork Sausages', 'Poêlée Paysanne g',
  'Premium Fruit & Nut Muesli', 'Prince Goût Chocolat', 'Pringles Original', 'Proper Sourdough', 'Pruneaux d\'AGEN dénoyautés',
  'Pruneaux d\'Agen', 'Pruneaux d\'Agen dénoyautés', 'Red Seedless Grapes', 'Rillettes du Mans', 'Ripe & Ready Medium Avocados',
  'Ryvita Multigrain Crispbread', 'Rôti de Porc', 'Rôti de Poulet', 'S. Pellegrino Water', 'Sable coco Henry s g',
];


export default function ChecklistScreen() {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addedHistory, setAddedHistory] = useState([]);

  // Get suggestions based on input
  const suggestions = useMemo(() => {
    if (!showSuggestions) return [];
    
    // If input is empty, show last 3 added items
    if (newItemText.trim() === '') {
      return addedHistory.slice(-3).reverse();
    }
    
    // Otherwise, find closest matches
    const searchTerm = newItemText.toLowerCase();
    const matches = [];
    
    // First check history for matches
    const historyMatches = addedHistory
      .filter(item => item.toLowerCase().includes(searchTerm))
      .slice(-3)
      .reverse();
    
    matches.push(...historyMatches);
    
    // Then check common groceries
    if (matches.length < 3) {
      const commonMatches = COMMON_GROCERIES
        .filter(item => 
          item.toLowerCase().includes(searchTerm) && 
          !matches.includes(item)
        )
        .slice(0, 3 - matches.length);
      
      matches.push(...commonMatches);
    }
    
    return matches.slice(0, 3);
  }, [newItemText, showSuggestions, addedHistory]);

  const addItem = (text = newItemText) => {
    if (text.trim() === '') return;
    
    const newItem = {
      id: Date.now().toString(),
      text: text,
      checked: false,
    };
    
    setItems([...items, newItem]);
    
    // Add to history if not already there
    if (!addedHistory.includes(text)) {
      setAddedHistory([...addedHistory, text]);
    }
    
    setNewItemText('');
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion) => {
    addItem(suggestion);
  };

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery Checklist</Text>
      
      {/* Add new item section */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Add a new item..."
            value={newItemText}
            onChangeText={setNewItemText}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onSubmitEditing={() => addItem()}
          />
          
          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => selectSuggestion(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={() => addItem()}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Checklist items */}
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => toggleItem(item.id)}
            >
              <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                {item.checked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id)}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items yet. Add one above!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF99',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    zIndex: 1000,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40,
  },
});
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: const PopUpMenuPage());
  }
}

class PopUpMenuPage extends StatelessWidget {
  const PopUpMenuPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              child: Positioned(
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                child: Image.asset(
                  'assets/140430115517-06-comfort-foods.jpg',
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Fruit Nutrition Meal',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Container(
                        decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 86, 153, 153),
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.5),
                              spreadRadius: 1,
                              blurRadius: 5,
                              offset: Offset(0, 2),
                            ),
                          ],
                        ),
                        child: IconButton(
                          icon: Icon(Icons.favorite, color: Colors.white),
                          onPressed: () {},
                        ),
                      ),
                    ],
                  ),
                  const Row(
                    children: [
                      Icon(Icons.star,
                          color: Color.fromARGB(255, 86, 153, 153), size: 16),
                      Icon(Icons.star,
                          color: Color.fromARGB(255, 86, 153, 153), size: 16),
                      Icon(Icons.star,
                          color: Color.fromARGB(255, 86, 153, 153), size: 16),
                      Icon(Icons.star,
                          color: Color.fromARGB(255, 86, 153, 153), size: 16),
                      Icon(Icons.star, color: Colors.grey, size: 16),
                      SizedBox(width: 4),
                      Text('4.5'),
                      SizedBox(width: 8),
                      Text('1287 comments'),
                    ],
                  ),
                  SizedBox(height: 26),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildIconText(Icons.food_bank, 'Normal'),
                      _buildIconText(Icons.location_on, '1.7km'),
                      _buildIconText(Icons.access_time, '32min'),
                    ],
                  ),
                  SizedBox(height: 26),
                  Text(
                    'Introduce',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'The pasta in the picture uses alkaline noodles, which many people are not very familiar with. The sauce is also very popular with the local people. if',
                    style: TextStyle(fontSize: 14, color: Colors.grey[700]),
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Text(
                        "Expend ",
                        style: TextStyle(
                          fontSize: 14,
                          color: Color.fromARGB(255, 86, 153, 153),
                        ),
                      ),
                      Icon(
                        Icons.keyboard_arrow_down,
                        color: Color.fromARGB(255, 86, 153, 153),
                        size: 20,
                      ),
                    ],
                  ),
                  SizedBox(height: 50),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(50),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.5),
                              spreadRadius: 2,
                              blurRadius: 5,
                              offset: Offset(0, 3),
                            ),
                          ],
                        ),
                        padding:
                            EdgeInsets.symmetric(vertical: 8, horizontal: 7),
                        child: Row(
                          children: [
                            _buildCounterButton(Icons.remove),
                            SizedBox(width: 5),
                            Text(
                              '2',
                              style: TextStyle(
                                fontSize: 18,
                              ),
                            ),
                            SizedBox(width: 5),
                            _buildCounterButton(Icons.add),
                          ],
                        ),
                      ),
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(50),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.5),
                              spreadRadius: 2,
                              blurRadius: 5,
                              offset: Offset(0, 3),
                            ),
                          ],
                        ),
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color.fromARGB(255, 86, 153, 153),
                            padding: EdgeInsets.symmetric(
                              horizontal: 24,
                              vertical: 12,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                          ),
                          child: const Row(
                            children: [
                              Text(
                                '\$ 28  |   Add to cart',
                                style: TextStyle(
                                    fontSize: 16,
                                    color: Color.fromRGBO(255, 255, 255, 1)),
                              ),
                            ],
                          ),
                        ),
                      )
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildIconText(IconData icon, String text) {
    return Row(
      children: [
        Icon(icon, color: Colors.grey),
        SizedBox(width: 4),
        Text(text, style: TextStyle(fontSize: 14)),
      ],
    );
  }

  Widget _buildCounterButton(IconData icon) {
    return Container(
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        shape: BoxShape.circle,
      ),
      child: Icon(icon, size: 16),
    );
  }
}

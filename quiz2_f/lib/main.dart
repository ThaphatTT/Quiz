import 'package:flutter/material.dart';
import 'package:barcode/barcode.dart';
import 'package:barcode_widget/barcode_widget.dart';

void main() {
  runApp(const MaterialApp(
    home: ReceiptWidget(),
  ));
}

class ReceiptWidget extends StatelessWidget {
  const ReceiptWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      body: Center(
        child: Container(
          width: 300,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(8),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.3),
                spreadRadius: 1,
                blurRadius: 5,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Receipt',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Adress: 1234 Lorem Ipsum, Dolor'),
                  Text('Tel: 123-456-7890'),
                ],
              ),
              const Divider(thickness: 1),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Date: 01-01-2018'),
                  Text('10:35'),
                ],
              ),
              const Divider(thickness: 1),
              _buildItem('Lorem', '6.50'),
              _buildItem('Ipsum', '7.50'),
              _buildItem('Lorem Ipsum', '48.00'),
              _buildItem('Lorem', '9.30'),
              _buildItem('Lorem I', '11.90'),
              _buildItem('Ipsum', '1.20'),
              _buildItem('Lorem Ipsum', '0.40'),
              const Divider(thickness: 1),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'AMOUNT',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Text(
                    '84.80',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              // Subtotal and Tax
              _buildSummaryItem('Sub-total', '76.80'),
              _buildSummaryItem('Sales Tax', '8.00'),
              _buildSummaryItem('Balance', '84.80'),
              const SizedBox(height: 16),
              // Barcode
              Container(
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: BarcodeWidget(
                      barcode: Barcode.code128(),
                      data: 'tqasdfkoakdfasd[aksd[asdkasodaso[da[sd]]]]',
                      width: double.infinity,
                      height: 90.0,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildItem(String name, String price) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(name),
          Text(price),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(String label, String amount) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Text(amount),
        ],
      ),
    );
  }
}

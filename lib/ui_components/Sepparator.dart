import 'package:flutter/material.dart';

class Sepparator extends StatelessWidget {
  final double vertical;

  const Sepparator({super.key, this.vertical = 20});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 2,
      margin: EdgeInsets.symmetric(vertical: vertical),
      color: Theme.of(context).colorScheme.primary,
    );
  }
}

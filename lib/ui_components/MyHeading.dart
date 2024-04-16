import 'package:flutter/material.dart';

class MyHeading extends StatelessWidget {
  final String text;

  const MyHeading({
    required this.text,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Text(
        text,
        style: TextStyle(
          color: Theme.of(context).colorScheme.onBackground.withOpacity(0.87),
          fontWeight: FontWeight.bold,
          fontSize: 20,
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

class MyText extends StatelessWidget {
  final String text;

  const MyText({
    required this.text,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Text(
        text,
        textAlign: TextAlign.justify,
        style: TextStyle(
          color: Theme.of(context).colorScheme.onBackground.withOpacity(0.87),
          fontWeight: FontWeight.normal,
          fontSize: 16,
        ),
      ),
    );
  }
}

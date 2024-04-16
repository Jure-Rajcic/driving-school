import 'package:autoskola/mvvm/view.abs.dart';
import 'package:autoskola/routes.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final _router = AppRouter();

  MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Driving School',
      navigatorObservers: [routeObserver],
      initialRoute: '/',
      onGenerateRoute: _router.route,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.light,
        colorScheme: ColorScheme.fromSwatch().copyWith(
          primary: const Color(0xFF6C63FF),
          onPrimary: const Color(0xFFFFFFFF),
          secondary: const Color(0xFFCA47A6),
          background: const Color(0XFFE8EAF6),
          onBackground: const Color(0xFF000000),
        ),
        // fontFamily: 'Georgia',
      )
    );
  }
}

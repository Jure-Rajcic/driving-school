import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class CarouselComponent extends StatelessWidget {
  final String asset;
  final String title;

  const CarouselComponent({
    super.key,
    required this.asset,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      width: 300,
      margin: const EdgeInsets.symmetric(horizontal: 5.0),
      padding: const EdgeInsets.all(10.0),
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          final double totalHeight = constraints.maxHeight;
          final double svgHeight = totalHeight * 0.8;
          final double spaceHeight = totalHeight * 0.05;
          final double textHeight = totalHeight * 0.15;

          return Column(
            children: [
              Container(
                height: svgHeight,
                child: SvgPicture.asset(
                  asset,
                  fit: BoxFit.contain,
                ),
              ),
              SizedBox(height: spaceHeight),
              Container(
                height: textHeight,
                child: Text(
                  title,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

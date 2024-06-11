using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class ArithmeticExpressionValidator
{
    public static bool IsValidArithmeticExpression(string input)
    {
        // Remove any spaces from the input
        input = input.Replace(" ", "");

        // Check for invalid characters
        if (!Regex.IsMatch(input, @"^[\d\+\-\*/\(\)]+$"))
        {
            return false;
        }

        // Check for balanced parentheses
        if (!AreParenthesesBalanced(input))
        {
            return false;
        }

        // Check for valid token sequence
        return IsValidTokenSequence(input);
    }

    private static bool AreParenthesesBalanced(string input)
    {
        int balance = 0;
        foreach (char c in input)
        {
            if (c == '(')
            {
                balance++;
            }
            else if (c == ')')
            {
                balance--;
                if (balance < 0)
                {
                    return false;
                }
            }
        }
        return balance == 0;
    }

    private static bool IsValidTokenSequence(string input)
    {
        string pattern = @"^\d+|[\+\-\*/\(\)]$";
        bool lastWasOperator = true;  // Start expecting a number or '('
        foreach (char c in input)
        {
            if (char.IsDigit(c))
            {
                lastWasOperator = false;
            }
            else if ("+-*/".Contains(c))
            {
                if (lastWasOperator)
                {
                    return false;  // Two operators in a row
                }
                lastWasOperator = true;
            }
            else if (c == '(')
            {
                if (!lastWasOperator)
                {
                    return false;  // No operator before '('
                }
                lastWasOperator = true;
            }
            else if (c == ')')
            {
                if (lastWasOperator)
                {
                    return false;  // No operator or '(' before ')'
                }
                lastWasOperator = false;
            }
            else
            {
                return false;  // Invalid character
            }
        }
        return !lastWasOperator;  // Expression should not end with an operator
    }

}

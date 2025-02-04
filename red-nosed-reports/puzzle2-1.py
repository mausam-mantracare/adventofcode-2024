import sys

def find_safe(report):
    if len(report) < 1:
        return True

    first = report[0]
    second = report[1]
    increasing = first < second

    for i in range(1, len(report)):
        diff = report[i] - report[i-1]

        if abs(diff) < 1 or abs(diff) > 3:
            return False

        if (increasing and diff < 0) or (not increasing and diff > 0):
            return False

    return True
        
        
def is_safe_count(report, unsafe_count):
    if unsafe_count > 1:
        return False
    
    if find_safe(report):
        return True

    for i in range(len(report)):
        if is_safe_count(report[:i] + report[i+1:], unsafe_count + 1):
            return True

    return False

if __name__ == "__main__":

    input_file = open(sys.argv[1], "r")
    reports = [list(map(int, line.split())) for line in input_file]
    
    safe_count = 0

    for report in reports:
        safe = True
        unsafe_count = 0
        
        if is_safe_count(report, unsafe_count):
            safe_count += 1
            
    print(safe_count)



